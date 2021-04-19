import {
  DRAW_CARD_FROM_QUEUE,
  DRAW_CARD_CORE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from, of } from 'rxjs'
import { drawCardQueue as q } from '../../utils/queues'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD_FROM_QUEUE)),
    concatMap((action) => {
      const nPromise = q.dequeueAsync()
      return from(nPromise).pipe(
        concatMap((n) => {
          return of<RootActionType>({
            type: DRAW_CARD_CORE,
            n,
          })
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
