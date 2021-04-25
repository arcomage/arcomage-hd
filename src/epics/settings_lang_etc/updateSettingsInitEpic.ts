import {
  UPDATE_SETTINGS_INIT,
  UPDATE_SETTINGS,
  INIT,
  SEND_SETTINGS,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, mergeMap, delay, withLatestFrom } from 'rxjs/operators'
import { of, concat, EMPTY } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_SETTINGS_INIT)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { payload } = action
      const isHost =
        state.multiplayer.on && state.multiplayer.status === 'connected_to_id'

      return concat(
        of<RootActionType>({
          type: UPDATE_SETTINGS,
          payload,
        }),
        isHost
          ? of<RootActionType>({
              type: SEND_SETTINGS,
              payload,
            })
          : EMPTY,
        of<RootActionType>({
          type: INIT,
        }).pipe(delay(0)),
      )
    }),
  )
