import {
  CLEAR_CARD,
  USE_CARD,
  EXEC_CARD,
  MOVE_CARD_TO_CENTER,
  SWITCH_LOCK,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  MOVE_CARD_TO_TOP,
  DRAW_CARD,
  NEXT_ROUND,
  ABORT_ALL,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import {
  filter,
  concatMap,
  delay,
  withLatestFrom,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { concat, EMPTY, of } from 'rxjs'
import playSound from '../utils/playSound'
import cards from '../data/cards'
import {
  cardNextStepTimeoutMs,
  cardTransitionDurationMs,
} from '../constants/visuals'

export const useCardEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const { n, index, position, owner } = action
      const special = cards[n].special
      playSound('deal', state.volume)
      return concat(
        state.game.isNewTurn
          ? of({
              type: CLEAR_CARD,
            })
          : EMPTY,
        of({
          type: EXEC_CARD,
          n,
          owner,
        }),
        of({
          type: MOVE_CARD_TO_CENTER,
          index,
        }),
        of({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        of({
          type: SWITCH_LOCK,
        }),
        special?.drawDiscardPlayagain
          ? concat(
              of({
                type: SWITCH_DISCARD_MODE,
              }),
              of({
                type: DRAW_CARD,
              }).pipe(delay(0)),
              of({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDurationMs + cardNextStepTimeoutMs)),
              of({
                type: SWITCH_LOCK,
              }),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
          : concat(
              of({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDurationMs + cardNextStepTimeoutMs)),
              special?.playagain
                ? concat(
                    of({
                      type: DRAW_CARD,
                    }).pipe(delay(0)),
                    of({
                      type: SWITCH_LOCK,
                    }),
                  ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
                : of({
                    type: NEXT_ROUND,
                    index,
                  }).pipe(delay(cardTransitionDurationMs)),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL))),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default useCardEpic
