import {
  DRAW_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, mergeMap, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { concat, of } from 'rxjs'
import playSound from '../utils/playSound'
import { randomWithProbs } from '../utils/randomWithProbs'
import { drawCardPre } from '../constants/transition'

export const nextRoundEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const newCardN = randomWithProbs()

      playSound('deal')

      return concat(
        of({
          type: DRAW_CARD_PRE,
          n: newCardN,
        }),
        of({
          type: DRAW_CARD_MAIN,
          position:
            state.cards.nextPos[state.game.playersTurn ? 'player' : 'opponent'],
          owner: state.game.playersTurn ? 'player' : 'opponent',
        }).pipe(delay(drawCardPre)),
      )
    }),
  )

export default nextRoundEpic
