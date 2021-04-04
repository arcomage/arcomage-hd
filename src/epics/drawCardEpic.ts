import {
  DRAW_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  CHECK_UNUSABLE,
  AI_USE_CARD,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import {
  withLatestFrom,
  filter,
  concatMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { concat, EMPTY, of } from 'rxjs'
import playSound from '../utils/playSound'
import { randomWithProbs } from '../utils/randomWithProbs'
import {
  cardNextStepTimeoutMs,
  cardTransitionDurationMs,
  drawCardPre,
} from '../constants/visuals'
import { noAiDelay, useAi } from '../constants/devSettings'

export const nextRoundEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DRAW_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const newCardN = randomWithProbs()
      const owner = state.game.playersTurn ? 'player' : 'opponent'
      playSound('deal', state.volume)

      return concat(
        of<RootActionType>({
          type: DRAW_CARD_PRE,
          n: newCardN,
        }),
        of<RootActionType>({
          type: CHECK_UNUSABLE,
          lastOnly: true,
        }),
        of<RootActionType>({
          type: DRAW_CARD_MAIN,
          position: state.cards.nextPos[owner],
          owner,
        }).pipe(delay(drawCardPre)),
        owner === 'opponent' && useAi
          ? of<RootActionType>({
              type: AI_USE_CARD,
            }).pipe(
              delay(
                cardTransitionDurationMs +
                  cardNextStepTimeoutMs +
                  10 +
                  (noAiDelay ? 0 : 5000),
              ),
              takeUntil(action$.ofType(ABORT_ALL)),
            ) // The delay in useCardEpic, plus noAiDelay (5s) in devSettings
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default nextRoundEpic
