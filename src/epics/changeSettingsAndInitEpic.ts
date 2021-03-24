import {
  CHANGE_SETTINGS_AND_INIT,
  CHANGE_SETTINGS,
  INIT,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { filter, mergeMap } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'

export const changeSettingsAndInitEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(CHANGE_SETTINGS_AND_INIT)),
    mergeMap(({ payload }) =>
      concat(
        of({
          type: CHANGE_SETTINGS,
          payload,
        }),
        of({
          type: INIT,
        }),
      ),
    ),
  )

export default changeSettingsAndInitEpic
