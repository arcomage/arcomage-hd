import {
  ABORT_CONNECTION,
  ABORT_SEND_FORM_FIELDS,
  SEND,
  SEND_FORM_FIELDS,
  SET_TEMP_SETTINGS,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, takeUntil, concatMap, debounceTime } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { reverseFormFields } from '../../utils/reverseState'
import { INST } from '../../constants/connDataKind'
import { EMPTY, merge, of } from 'rxjs'
import { sendSettingsDebounceTime } from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND_FORM_FIELDS)),
    debounceTime(sendSettingsDebounceTime),
    concatMap((action) => {
      const { payload } = action
      const connSettings = payload !== null ? reverseFormFields(payload) : null
      return connSettings
        ? of<RootActionType>({
            type: SEND,
            kind: INST,
            data: {
              type: SET_TEMP_SETTINGS,
              payload: connSettings,
            },
          }).pipe(
            takeUntil(
              merge(
                action$.ofType(ABORT_SEND_FORM_FIELDS),
                action$.ofType(ABORT_CONNECTION),
              ),
            ),
          )
        : EMPTY
    }),
  )
