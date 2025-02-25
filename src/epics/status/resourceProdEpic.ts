import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { withLatestFrom, filter, takeUntil, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  ABORT_ALL,
  RESOURCE_PROD,
  UPDATE_STATUS,
} from '@/constants/ActionTypes'
import { resProdMap } from '@/constants/resourceNames'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { entries } from '@/utils/typeHelpers'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(RESOURCE_PROD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
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
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
