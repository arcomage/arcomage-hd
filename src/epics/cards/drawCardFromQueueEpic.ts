import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, from, Observable, of } from 'rxjs'
import { mergeMap, takeUntil, delay, withLatestFrom } from 'rxjs/operators'
import {
  DRAW_CARD_FROM_QUEUE,
  DRAW_CARD_CORE,
  ABORT_CONNECTION,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import Queue from '@/utils/multiplayer/Queue'
import { drawCardQueues } from '@/utils/multiplayer/queues'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(DRAW_CARD_FROM_QUEUE),
    withLatestFrom(state$),
    mergeMap(([_action, state]) => {
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
