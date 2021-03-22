import {
  CHANGE_SETTINGS_AND_INIT,
  CHANGE_SETTINGS,
  INIT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { of, merge } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardListItemAllType, CardStateType, StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { randomWithProbs } from '../utils/randomWithProbs'

export const changeSettingsAndInitEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const playersTurn = Math.random() < 0.5

      const total = state.settings.cardsInHand
      const obj: CardStateType = {
        total: { player: total, opponent: total },
        list: [],
        nextPos: { player: total, opponent: total },
      }
      for (let i = 0, l = total * 2; i < l; i++) {
        const card: CardListItemAllType = {
          position: i % total,
          n: randomWithProbs(),
          unusable: false,
          discarded: false,
          isflipped: false,
          owner: i < total ? 'player' : 'opponent',
        }
        obj.list.push(card)
      }

      const newCardN = randomWithProbs()

      return merge(
        of({
          type: INIT_CARD,
          payload: obj,
        }),
        of({
          type: INIT_GAME,
          playersTurn,
        }),
        of({
          type: INIT_STATUS,
          payload: state.settings.start,
        }),
        of({
          type: DRAW_CARD,
          n: newCardN,
          position: obj.nextPos[playersTurn ? 'player' : 'opponent'],
          owner: playersTurn ? 'player' : 'opponent',
        }),
      )
    }),
  )

export default changeSettingsAndInitEpic
