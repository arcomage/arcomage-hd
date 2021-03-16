import { UPDATE_STATUS, EXEC_CARD } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'

export const execCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(EXEC_CARD)),
    withLatestFrom(state$),
    map(([action, state]) => {
      const pOriginal = state.status.player
      const oOriginal = state.status.opponent
      const p = { ...pOriginal }
      const o = { ...oOriginal }

      const ret = dataCards[action.n].effect(p, o)

      const newUpdArr = entries(p)
        .filter(([key, value]) => value !== pOriginal[key])
        .map(([key, value]) => ({
          isPlayer: true,
          statusProp: key,
          to: value,
        }))
        .concat(
          entries(o)
            .filter(([key, value]) => value !== pOriginal[key])
            .map(([key, value]) => ({
              isPlayer: false,
              statusProp: key,
              to: value,
            })),
        )

      return {
        type: UPDATE_STATUS,
        updArr: newUpdArr,
      }
    }),
  )

export default execCardEpic
