import {
  INIT,
  INIT_CARD,
  INIT_GAME,
  INIT_STATUS,
  DRAW_CARD,
  RESOURCE_PROD,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { of, concat } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardListItemAllType, CardStateType, StateType } from '../types/state'
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

      return concat(
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
          type: RESOURCE_PROD,
          owner: playersTurn ? 'player' : 'opponent',
        }),
        of({
          type: DRAW_CARD,
        }),
      )
    }),
  )

export default changeSettingsAndInitEpic
