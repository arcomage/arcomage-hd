import { ofType, StateObservable } from 'redux-observable'
import { merge, Observable, of } from 'rxjs'
import { takeUntil, mergeMap, debounceTime } from 'rxjs/operators'
import {
  ABORT_CONNECTION,
  ABORT_SEND_TEMP_SETTINGS,
  SEND,
  SEND_TEMP_SETTINGS,
  SET_TEMP_SETTINGS,
} from '@/constants/ActionTypes'
import { INST } from '@/constants/connDataKind'
import { sendSettingsDebounceTime } from '@/constants/visuals'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(SEND_TEMP_SETTINGS),
    debounceTime(sendSettingsDebounceTime),
    mergeMap((action) => {
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
            action$.pipe(ofType(ABORT_SEND_TEMP_SETTINGS)),
            action$.pipe(ofType(ABORT_CONNECTION)),
          ),
        ),
      )
    }),
  )
