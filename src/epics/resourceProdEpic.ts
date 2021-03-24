import { RESOURCE_PROD, UPDATE_STATUS } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import { concat, of } from 'rxjs'
import { resProdMap } from '../constants/resourceNames'

export const resourceProdEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
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

      return concat(
        of({
          type: UPDATE_STATUS,
          payload,
        }),
      )
    }),
  )

export default resourceProdEpic
