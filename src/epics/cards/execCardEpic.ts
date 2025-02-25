import { ofType, StateObservable } from 'redux-observable'
import { Observable, of } from 'rxjs'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { UPDATE_STATUS, EXEC_CARD, ABORT_ALL } from '@/constants/ActionTypes'
import { resNames } from '@/constants/resourceNames'
import dataCards from '@/data/cards'
import { RootActionType, UpdateStatusActionTypeSingle } from '@/types/actionObj'
import { RootStateType } from '@/types/state'
import { entries } from '@/utils/typeHelpers'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(EXEC_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const pOriginal = state.status.player
      const oOriginal = state.status.opponent
      const p = { ...pOriginal }
      const o = { ...oOriginal }

      const card = dataCards[action.n]

      const ownerStatusObj = action.owner === 'player' ? p : o
      const resName = resNames[card.type]
      ownerStatusObj[resName] -= card.cost
      const resAfterCost = ownerStatusObj[resName]

      const effectFunc = card.effect
      if (action.owner === 'player') {
        effectFunc(p, o)
      } else {
        // action.owner === 'opponent'
        effectFunc(o, p)
      }

      const newArr: UpdateStatusActionTypeSingle[] = entries(p)
        .filter(([key, value]) => value !== pOriginal[key])
        .map(([key, value]) => ({
          isPlayer: true,
          statusProp: key,
          to: value,
          noSound:
            action.owner === 'player' &&
            key === resName &&
            value === resAfterCost,
        }))
        .concat(
          entries(o)
            .filter(([key, value]) => value !== oOriginal[key])
            .map(([key, value]) => ({
              isPlayer: false,
              statusProp: key,
              to: value,
              noSound:
                action.owner === 'opponent' &&
                key === resName &&
                value === resAfterCost,
            })),
        )

      return of<RootActionType>({
        type: UPDATE_STATUS,
        payload: newArr,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
