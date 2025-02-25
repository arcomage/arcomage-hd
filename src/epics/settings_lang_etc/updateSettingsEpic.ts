import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  UPDATE_SETTINGS,
  UPDATE_SETTINGS_MAIN,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import {
  defaultOpponentNameList,
  defaultPlayerNameList,
  defaultSettingState,
} from '@/constants/defaultSettings'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { lsSet } from '@/utils/localstorage'
import { sample } from '@/utils/random'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_SETTINGS)),
    mergeMap((action) => {
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
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
