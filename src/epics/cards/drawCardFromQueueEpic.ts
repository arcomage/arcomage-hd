import {
  DRAW_CARD_FROM_QUEUE,
  DRAW_CARD_CORE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  mergeMap,
  takeUntil,
  delay,
  withLatestFrom,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { EMPTY, from, Observable, of } from 'rxjs'
import { drawCardQueues } from '../../utils/multiplayer/queues'
import Queue from '../../utils/multiplayer/Queue'
import devLog from '../../utils/devLog'

export default (
  action$: Observable<RootActionType>,
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
        mergeMap(([n, state0]) => {
          const currentGameNumber = state0.multiplayer.gameNumber
          return currentGameNumber === gameNumber
            ? of<RootActionType>({
                type: DRAW_CARD_CORE,
                n,
              }).pipe(delay(0))
            : EMPTY
        }),
        takeUntil(action$.pipe(ofType(ABORT_CONNECTION))),
      )
    }),
  )
