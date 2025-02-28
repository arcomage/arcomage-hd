import { ofType, StateObservable } from 'redux-observable'
import { concat, Observable, of } from 'rxjs'
import { withLatestFrom, mergeMap } from 'rxjs/operators'
import {
  CLOSE_SCREEN_END_INIT,
  INIT,
  INIT_FROM_QUEUE,
  SCREEN_END,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(CLOSE_SCREEN_END_INIT),
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
