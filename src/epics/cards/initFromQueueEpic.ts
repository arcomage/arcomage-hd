import {
  INIT_FROM_QUEUE,
  INIT_CORE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { InitToQueueActionType, RootActionType } from '../../types/actionObj'
import {
  filter,
  mergeMap,
  takeUntil,
  delay,
  withLatestFrom,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { EMPTY, from, of } from 'rxjs'
import { initQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'
import devLog from '../../utils/devLog'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT_FROM_QUEUE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
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
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
