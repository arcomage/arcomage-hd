import { INIT_TO_QUEUE } from '../../constants/ActionTypes'
import { InitToQueueActionType, RootActionType } from '../../types/actionObj'
import { filter, tap, ignoreElements } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { initQueues } from '../../utils/queues'
import Queue from '../../utils/Queue'
import devLog from '../../utils/devLog'
import { Observable } from 'rxjs'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT_TO_QUEUE)),
    tap((action) => {
      const { type, prevGameNumber, ...rest } = action
      // rest = {playersTurn, cardList, gameNumber}

      if (prevGameNumber === undefined) {
        devLog(
          `prevGameNumber is undefined in ${JSON.stringify(action)}`,
          'error',
        )
        return
      }

      let initQueue = initQueues.get(prevGameNumber)
      if (initQueue === undefined) {
        initQueue = new Queue<Omit<InitToQueueActionType, 'type'>>()
        initQueues.set(prevGameNumber, initQueue)
      }

      initQueue.enqueue(rest)
      return
    }),
    ignoreElements(),
  )
