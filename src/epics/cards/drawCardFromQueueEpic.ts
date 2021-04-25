import {
  DRAW_CARD_FROM_QUEUE,
  DRAW_CARD_CORE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  concatMap,
  takeUntil,
  delay,
  withLatestFrom,
  mergeMap,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { EMPTY, from, of } from 'rxjs'
import { drawCardQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'
import devLog from '../../utils/devLog'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD_FROM_QUEUE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { gameNumber } = state.multiplayer
      devLog(`draw card from queue: ${gameNumber.toString()}`, 'info')

      let drawCardQueue = drawCardQueues.get(gameNumber)
      if (drawCardQueue === undefined) {
        drawCardQueue = new Queue<number>()
        drawCardQueues.set(gameNumber, drawCardQueue)
      }

      const nPromise = drawCardQueue.dequeueAsync()
      return from(nPromise).pipe(
        withLatestFrom(state$),
        concatMap(([n, state]) => {
          const currentGameNumber = state.multiplayer.gameNumber
          return currentGameNumber === gameNumber
            ? of<RootActionType>({
                type: DRAW_CARD_CORE,
                n,
              }).pipe(delay(0))
            : EMPTY
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
