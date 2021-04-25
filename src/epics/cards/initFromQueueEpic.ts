import {
  INIT_FROM_QUEUE,
  INIT_CORE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from, of } from 'rxjs'
import { initQueue as q } from '../../utils/queues'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT_FROM_QUEUE)),
    concatMap((action) => {
      const initObjPromise = q.dequeueAsync()
      return from(initObjPromise).pipe(
        concatMap((initObj) => {
          return of<RootActionType>({
            type: INIT_CORE,
            ...initObj,
          }).pipe(delay(0))
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
