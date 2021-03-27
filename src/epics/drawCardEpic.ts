import {
  DRAW_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  CHECK_UNUSABLE,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, delay } from 'rxjs/operators'
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
    concatMap(([action, state]) => {
      const newCardN = randomWithProbs()

      playSound('deal', state.volume)

      return concat(
        of({
          type: DRAW_CARD_PRE,
          n: newCardN,
        }),
        of({
          type: CHECK_UNUSABLE,
          lastOnly: true,
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
