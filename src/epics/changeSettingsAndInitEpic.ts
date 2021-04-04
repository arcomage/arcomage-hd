import {
  CHANGE_SETTINGS_AND_INIT,
  CHANGE_SETTINGS,
  INIT,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'

export const changeSettingsAndInitEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHANGE_SETTINGS_AND_INIT)),
    concatMap(({ payload }) =>
      concat(
        of<RootActionType>({
          type: ABORT_ALL,
        }),
        of<RootActionType>({
          type: CHANGE_SETTINGS,
          payload,
        }),
        of<RootActionType>({
          type: INIT,
        }),
      ),
    ),
  )

export default changeSettingsAndInitEpic
