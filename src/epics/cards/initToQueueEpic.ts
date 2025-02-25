import { StateObservable } from 'redux-observable'
import { Observable } from 'rxjs'
import { filter, tap, ignoreElements } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { INIT_TO_QUEUE } from '@/constants/ActionTypes'
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
