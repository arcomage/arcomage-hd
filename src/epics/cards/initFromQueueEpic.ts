import { ofType, StateObservable } from 'redux-observable'
import { EMPTY, from, Observable, of } from 'rxjs'
import { mergeMap, takeUntil, delay, withLatestFrom } from 'rxjs/operators'
import {
  INIT_FROM_QUEUE,
  INIT_CORE,
  ABORT_CONNECTION,
} from '@/constants/ActionTypes'
import { InitToQueueActionType, RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import devLog from '@/utils/devLog'
import Queue from '@/utils/multiplayer/Queue'
import { initQueues } from '@/utils/multiplayer/queues'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(INIT_FROM_QUEUE),
    withLatestFrom(state$),
    mergeMap(([_action, state]) => {
      const { gameNumber } = state.multiplayer
      devLog(`init from queue: ${gameNumber.toString()}`, 'info')

      let initQueue = initQueues.get(gameNumber)
      if (initQueue === undefined) {
        initQueue = new Queue<Omit<InitToQueueActionType, 'type'>>()
        initQueues.set(gameNumber, initQueue)
      }

      const initObjPromise = initQueue.dequeueAsync()
      return from(initObjPromise).pipe(
        withLatestFrom(state$),
        mergeMap(([initObj, state0]) => {
          const currentGameNumber = state0.multiplayer.gameNumber
          return currentGameNumber === gameNumber
            ? of<RootActionType>({
                type: INIT_CORE,
                ...initObj,
              }).pipe(delay(0))
            : EMPTY
        }),
        takeUntil(action$.pipe(ofType(ABORT_CONNECTION))),
      )
    }),
  )
