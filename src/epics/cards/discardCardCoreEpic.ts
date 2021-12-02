import {
  CLEAR_CARD,
  DISCARD_CARD_CORE,
  ADD_DISCARDED_TAG,
  DRAW_CARD,
  NEXT_ROUND,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  SWITCH_LOCK,
  MOVE_CARD_TO_TOP,
  ABORT_ALL,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import {
  withLatestFrom,
  filter,
  mergeMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of, concat, EMPTY, Observable } from 'rxjs'
import { Sound } from '../../utils/Sound'
import { cardTransitionDuration } from '../../constants/visuals'
import getPan from '../../utils/getPan'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD_CORE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const { index, position, owner } = action
      Sound.play('deal', null, getPan(state.cards.total[owner], position))
      return concat(
        state.game.isNewTurn
          ? of<RootActionType>({
              type: CLEAR_CARD,
            })
          : EMPTY,
        of<RootActionType>({
          type: ADD_DISCARDED_TAG,
          index,
        }),
        of<RootActionType>({
          type: MOVE_CARD_TO_TOP,
          index,
        }).pipe(delay(0)),
        of<RootActionType>({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        state.game.discardMode
          ? concat(
              of<RootActionType>({
                type: SWITCH_DISCARD_MODE,
                on: false,
              }),
              of<RootActionType>({
                type: DRAW_CARD,
              }).pipe(delay(0)),
            )
          : concat(
              of<RootActionType>({
                type: SWITCH_LOCK,
                on: true, // will switch back in `NEXT_ROUND`
              }),
              of<RootActionType>({
                type: NEXT_ROUND,
              }).pipe(delay(cardTransitionDuration)),
            ),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
