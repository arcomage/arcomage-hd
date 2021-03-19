import { UPDATE_STATUS, EXEC_CARD } from '../constants/ActionTypes'
import { ActionType, UpdateStatusActionTypeSingle } from '../types/actionObj'
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

      const card = dataCards[action.n]
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

      newArr.push({
        isPlayer: action.owner === 'player',
        statusProp: (['bricks', 'gems', 'recruits'] as const)[card.type],
        diff: -card.cost,
        noSound: true,
      })

      return {
        type: UPDATE_STATUS,
        payload: newArr,
      }
    }),
  )

export default execCardEpic
