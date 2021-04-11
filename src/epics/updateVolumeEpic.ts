import {
  UPDATE_VOLUME,
  UPDATE_VOLUME_MAIN,
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
    filter(isOfType(UPDATE_VOLUME)),
    concatMap((action) => {
      const { volume } = action
      lsSet((draft) => {
        draft.volume = volume
      })
      return concat(
        of<RootActionType>({
          type: UPDATE_VOLUME_MAIN,
          volume,
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default changeSettingsAndInitEpic
