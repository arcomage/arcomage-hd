import {
  PLAY_CARD_FROM_QUEUE,
  ABORT_CONNECTION,
  PLAY_CARD_CORE_GUARDED,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil, map } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from } from 'rxjs'
import { playCardQueue as q } from '../../utils/queues'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PLAY_CARD_FROM_QUEUE)),
    concatMap((action) => {
      const playCardActionPromise = q.dequeueAsync()
      return from(playCardActionPromise).pipe(
        map((playCardAction) => {
          return {
            type: PLAY_CARD_CORE_GUARDED,
            payload: playCardAction,
          }
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
