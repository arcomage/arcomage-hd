import { ofType, StateObservable } from 'redux-observable'
import { of, concat, Observable } from 'rxjs'
import { mergeMap, takeUntil } from 'rxjs/operators'
import {
  SWITCH_MULTIPLAYER_MODE,
  SWITCH_MULTIPLAYER_MODE_MAIN,
  CONNECT_TO_NETWORK,
  DISCONNECT,
  ABORT_CONNECTION,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(SWITCH_MULTIPLAYER_MODE),
    mergeMap((action) => {
      const { on } = action
      return concat(
        on
          ? of<RootActionType>({
              type: CONNECT_TO_NETWORK,
            })
          : of<RootActionType>({
              type: DISCONNECT,
            }),
        of<RootActionType>({
          type: SWITCH_MULTIPLAYER_MODE_MAIN,
          on,
        }),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_CONNECTION))))
    }),
  )
