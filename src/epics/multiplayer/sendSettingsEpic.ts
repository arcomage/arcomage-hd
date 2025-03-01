import { ofType, StateObservable } from 'redux-observable'
import { concat, EMPTY, Observable, of } from 'rxjs'
import { takeUntil, mergeMap } from 'rxjs/operators'
import {
  ABORT_CONNECTION,
  ABORT_SEND_TEMP_SETTINGS,
  SEND,
  SEND_SETTINGS,
  SET_TEMP_SETTINGS,
  UPDATE_SETTINGS,
} from '@/constants/ActionTypes'
import { INST } from '@/constants/connDataKind'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

export default (
  action$: Observable<RootActionType>,
  _state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(SEND_SETTINGS),
    mergeMap((action) => {
      const { payload } = action
      const settings = payload
      return settings
        ? concat(
            of<RootActionType>({
              type: ABORT_SEND_TEMP_SETTINGS,
            }),
            of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: SET_TEMP_SETTINGS,
                payload: settings,
              },
            }),
            of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: UPDATE_SETTINGS,
                payload: settings,
              },
            }),
          ).pipe(takeUntil(action$.pipe(ofType(ABORT_CONNECTION))))
        : EMPTY
    }),
  )
