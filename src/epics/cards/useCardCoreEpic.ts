import {
  CLEAR_CARD,
  USE_CARD_CORE,
  EXEC_CARD,
  MOVE_CARD_TO_CENTER,
  SWITCH_LOCK,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  MOVE_CARD_TO_TOP,
  DRAW_CARD,
  NEXT_ROUND,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  filter,
  mergeMap,
  delay,
  withLatestFrom,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { concat, EMPTY, Observable, of } from 'rxjs'
import playSound from '../../utils/playSound'
import cards from '../../data/cards'
import {
  cardNextStepDelay,
  cardTransitionDuration,
} from '../../constants/visuals'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD_CORE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
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
          on: true,
        }),
        special?.drawDiscardPlayagain
          ? concat(
              of<RootActionType>({
                type: SWITCH_DISCARD_MODE,
                on: true,
              }),
              of<RootActionType>({
                type: DRAW_CARD,
              }).pipe(delay(0)),
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepDelay)),
              of<RootActionType>({
                type: SWITCH_LOCK,
                on: false,
              }),
            )
          : concat(
              of<RootActionType>({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDuration + cardNextStepDelay)),
              special?.playagain
                ? concat(
                    of<RootActionType>({
                      type: DRAW_CARD,
                    }).pipe(delay(0)),
                    of<RootActionType>({
                      type: SWITCH_LOCK,
                      on: false,
                    }),
                  )
                : of<RootActionType>({
                    type: NEXT_ROUND,
                  }).pipe(delay(cardTransitionDuration)),
            ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
