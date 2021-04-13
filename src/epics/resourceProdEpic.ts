import {
  ABORT_ALL,
  RESOURCE_PROD,
  UPDATE_STATUS,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, takeUntil, concatMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import { resProdMap } from '../constants/resourceNames'
import { of } from 'rxjs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RESOURCE_PROD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const currentStatus = state.status[action.owner]

      const payload = entries(resProdMap).map(([prod, res]) => ({
        isPlayer: action.owner === 'player',
        statusProp: res,
        diff: currentStatus[prod],
        noSound: true,
      }))

      return of<RootActionType>({
        type: UPDATE_STATUS,
        payload,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
