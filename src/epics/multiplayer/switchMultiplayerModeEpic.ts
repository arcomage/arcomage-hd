import {
  SWITCH_MULTIPLAYER_MODE,
  SWITCH_MULTIPLAYER_MODE_MAIN,
  CONNECT_TO_NETWORK,
  DISCONNECT,
  ABORT_CONNECTION,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { of, concat, Observable } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SWITCH_MULTIPLAYER_MODE)),
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
