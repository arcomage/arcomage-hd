import {
  UPDATE_SETTINGS_AND_INIT,
  UPDATE_SETTINGS,
  INIT,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { filter, concatMap, delay } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(UPDATE_SETTINGS_AND_INIT)),
    concatMap(({ payload }) =>
      concat(
        of<RootActionType>({
          type: ABORT_ALL,
        }),
        of<RootActionType>({
          type: UPDATE_SETTINGS,
          payload,
        }),
        of<RootActionType>({
          type: INIT,
        }).pipe(delay(0)),
      ),
    ),
  )
