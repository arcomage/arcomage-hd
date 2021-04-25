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
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from, of } from 'rxjs'
import { drawCardQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD_FROM_QUEUE)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { gameNumber } = state.multiplayer

      let drawCardQueue = drawCardQueues.get(gameNumber)
      if (drawCardQueue === undefined) {
        drawCardQueue = new Queue<number>()
        drawCardQueues.set(gameNumber, drawCardQueue)
      }

      const nPromise = drawCardQueue.dequeueAsync()
      return from(nPromise).pipe(
        concatMap((n) => {
          return of<RootActionType>({
            type: DRAW_CARD_CORE,
            n,
          }).pipe(delay(0))
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
