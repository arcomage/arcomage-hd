import {
  DRAW_CARD,
  DRAW_CARD_PRE,
  DRAW_CARD_MAIN,
  CHECK_UNUSABLE,
  AI_USE_CARD,
  ABORT_ALL,
  CHECK_SURRENDER,
  SWITCH_LOCK,
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
  aiDelay,
  cardTransitionDuration,
  drawCardPre,
} from '../constants/visuals'
import { aiExtraDelay, noAiExtraDelay, useAi } from '../constants/devSettings'

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
          type: SWITCH_LOCK,
          on: true,
          locknumber: 1,
        }),
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
          owner,
        }).pipe(delay(drawCardPre)),
        of<RootActionType>({
          type: SWITCH_LOCK,
          on: false,
          locknumber: 1,
        }).pipe(delay(0)),
        owner === 'opponent' && useAi
          ? of<RootActionType>({
              type: AI_USE_CARD,
            }).pipe(
              delay(
                cardTransitionDuration +
                  aiDelay +
                  (noAiExtraDelay ? 0 : aiExtraDelay),
              ),
              takeUntil(action$.ofType(ABORT_ALL)),
            )
          : EMPTY,
        owner === 'player'
          ? of<RootActionType>({
              type: CHECK_SURRENDER,
            }).pipe(delay(0), takeUntil(action$.ofType(ABORT_ALL)))
          : EMPTY,
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default nextRoundEpic
