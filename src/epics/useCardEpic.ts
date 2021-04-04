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
  cardNextStepTimeout,
  cardTransitionDuration,
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
          ? of<RootActionType>({
              type: CLEAR_CARD,
            })
          : EMPTY,
        of<RootActionType>({
          type: EXEC_CARD,
          n,
          owner,
        }),
        of<RootActionType>({
          type: MOVE_CARD_TO_CENTER,
          index,
        }),
        of<RootActionType>({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        of<RootActionType>({
          type: SWITCH_LOCK,
        }),
        special?.drawDiscardPlayagain
          ? concat(
              of<RootActionType>({
                type: SWITCH_DISCARD_MODE,
              }),
              of<RootActionType>({
                type: DRAW_CARD,
              }).pipe(delay(0)),
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepTimeout)),
              of<RootActionType>({
                type: SWITCH_LOCK,
              }),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
          : concat(
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepTimeout)),
              special?.playagain
                ? concat(
                    of<RootActionType>({
                      type: DRAW_CARD,
                    }).pipe(delay(0)),
                    of<RootActionType>({
                      type: SWITCH_LOCK,
                    }),
                  ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
                : of<RootActionType>({
                    type: NEXT_ROUND,
                  }).pipe(delay(cardTransitionDuration)),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL))),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default useCardEpic
