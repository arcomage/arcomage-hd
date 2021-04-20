import {
  ABORT_CONNECTION,
  ABORT_SEND_TEMP_SETTINGS,
  SEND,
  SEND_TEMP_SETTINGS,
  SET_TEMP_SETTINGS,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, takeUntil, concatMap, debounceTime } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { INST } from '../../constants/connDataKind'
import { merge, of } from 'rxjs'
import { sendSettingsDebounceTime } from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(SEND_TEMP_SETTINGS)),
    debounceTime(sendSettingsDebounceTime),
    concatMap((action) => {
      const { payload } = action
      return of<RootActionType>({
        type: SEND,
        kind: INST,
        data: {
          type: SET_TEMP_SETTINGS,
          payload,
        },
      }).pipe(
        takeUntil(
          merge(
            action$.ofType(ABORT_SEND_TEMP_SETTINGS),
            action$.ofType(ABORT_CONNECTION),
          ),
        ),
      )
    }),
  )
