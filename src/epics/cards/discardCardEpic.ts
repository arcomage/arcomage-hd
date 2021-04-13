import {
  CLEAR_CARD,
  DISCARD_CARD,
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
  concatMap,
  delay,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../../types/state'
import { of, concat, EMPTY } from 'rxjs'
import playSound from '../../utils/playSound'
import { cardTransitionDuration } from '../../constants/visuals'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    withLatestFrom(state$),
    concatMap(([{ index, position, owner }, state]) => {
      playSound('deal', state.volume)
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
              }),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
          : concat(
              of<RootActionType>({
                type: SWITCH_LOCK,
                on: true, // will switch back in `NEXT_ROUND`
              }),
              of<RootActionType>({
                type: NEXT_ROUND,
              }).pipe(delay(cardTransitionDuration)),
            ).pipe(takeUntil(action$.ofType(ABORT_ALL))),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
