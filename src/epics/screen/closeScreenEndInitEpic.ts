import {
  CLOSE_SCREEN_END_INIT,
  INIT,
  INIT_FROM_QUEUE,
  SCREEN_END,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, of } from 'rxjs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CLOSE_SCREEN_END_INIT)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const isGuest = state.multiplayer.status === 'connected_by_id'
      return concat(
        of<RootActionType>({
          type: SCREEN_END,
          payload: { type: null },
        }),
        isGuest
          ? of<RootActionType>({
              type: INIT_FROM_QUEUE,
            })
          : of<RootActionType>({
              type: INIT,
              forceGuestInit: true,
            }),
      )
    }),
  )
