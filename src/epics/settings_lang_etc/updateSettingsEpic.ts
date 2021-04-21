import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { filter, concatMap, takeUntil } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { lsSet } from '../../utils/localstorage'
import {
  defaultOpponentNameList,
  defaultPlayerNameList,
  defaultSettingState,
} from '../../constants/defaultSettings'
import { sample } from '../../utils/random'

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
          draft.settings = {
            ...defaultSettingState,
            playerName: sample(defaultPlayerNameList),
            opponentName: sample(defaultOpponentNameList),
            ...payload,
          }
        } else {
          draft.settings = { ...draft.settings, ...payload }
        }
      })
      return of<RootActionType>({
        type: UPDATE_SETTINGS_MAIN,
        payload,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
