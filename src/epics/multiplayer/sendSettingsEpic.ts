import {
  ABORT_CONNECTION,
  ABORT_SEND_FORM_FIELDS,
  SEND,
  SEND_SETTINGS,
  SET_TEMP_SETTINGS,
  UPDATE_SETTINGS,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, takeUntil, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { reverseSettingsState } from '../../utils/reverseState'
import { INST } from '../../constants/connDataKind'
import { concat, EMPTY, of } from 'rxjs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND_SETTINGS)),
    concatMap((action) => {
      const { payload } = action
      const connSettings = reverseSettingsState(payload)
      return connSettings
        ? concat(
            of<RootActionType>({
              type: ABORT_SEND_FORM_FIELDS,
            }),
            of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: SET_TEMP_SETTINGS,
                payload: connSettings,
              },
            }),
            of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: UPDATE_SETTINGS,
                payload: connSettings,
              },
            }).pipe(takeUntil(action$.ofType(ABORT_CONNECTION))),
          )
        : EMPTY
    }),
  )
