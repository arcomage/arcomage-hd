import {
  PLAY_CARD_FROM_QUEUE,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { from, of } from 'rxjs'
import { useCardQueue as q } from '../../utils/queues'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(PLAY_CARD_FROM_QUEUE)),
    concatMap((action) => {
      const playCardActionPromise = q.dequeueAsync()
      return from(playCardActionPromise).pipe(
        concatMap((playCardAction) => {
          // would always wait
          return of<RootActionType>(playCardAction)
        }),
        takeUntil(action$.ofType(ABORT_CONNECTION)),
      )
    }),
  )
