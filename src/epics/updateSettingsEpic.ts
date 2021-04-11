import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { lsSet } from '../utils/localstorage'

export const changeSettingsAndInitEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_SETTINGS)),
    concatMap((action) => {
      const { payload } = action
      lsSet((draft) => {
        draft.settings = payload
      })
      return concat(
        of<RootActionType>({
          type: UPDATE_SETTINGS_MAIN,
          payload,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default changeSettingsAndInitEpic
