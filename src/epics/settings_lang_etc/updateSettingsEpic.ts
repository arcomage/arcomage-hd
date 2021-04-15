import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import { defaultSettingState } from '../../constants/defaultSettings'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_SETTINGS)),
    concatMap((action) => {
      const { payload } = action
      lsSet((draft) => {
        if (draft.settings === undefined) {
          draft.settings = { ...defaultSettingState, ...payload }
        } else {
          draft.settings = { ...draft.settings, ...payload }
        }
      })
      return concat(
        of<RootActionType>({
          type: ABORT_ALL,
        }),
        of<RootActionType>({
          type: UPDATE_SETTINGS_MAIN,
          payload,
        }),
      )
    }),
  )
