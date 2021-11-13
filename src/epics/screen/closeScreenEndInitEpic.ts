import {
  CLOSE_SCREEN_END_INIT,
  INIT,
  INIT_FROM_QUEUE,
  SCREEN_END,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, Observable, of } from 'rxjs'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CLOSE_SCREEN_END_INIT)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const isGuestInGame =
        state.multiplayer.gameNumber > 0 &&
        state.multiplayer.status === 'connected_by_id'
      return concat(
        of<RootActionType>({
          type: SCREEN_END,
          payload: { type: null },
        }),
        isGuestInGame
          ? of<RootActionType>({
              type: INIT_FROM_QUEUE,
            })
          : of<RootActionType>({
              type: INIT,
              fromScreenEnd: true,
            }),
      )
    }),
  )
