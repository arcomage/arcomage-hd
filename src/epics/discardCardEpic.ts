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
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { of, concat, EMPTY } from 'rxjs'
import playSound from '../utils/playSound'
import { cardTransitionDurationMs } from '../constants/transition'

export const discardCardEpic = (
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
          ? of({
              type: CLEAR_CARD,
            })
          : EMPTY,
        of({
          type: ADD_DISCARDED_TAG,
          index,
        }),
        of({
          type: MOVE_CARD_TO_TOP,
          index,
        }).pipe(delay(0)),
        of({
          type: REMOVE_CARD,
          index,
          position,
          owner,
        }),
        state.game.discardMode
          ? concat(
              of({
                type: SWITCH_DISCARD_MODE,
              }),
              of({
                type: DRAW_CARD,
              }),
            )
          : concat(
              of({
                type: SWITCH_LOCK,
              }),
              of({
                type: NEXT_ROUND,
                index,
              }).pipe(delay(cardTransitionDurationMs)),
            ),
      )
    }),
  )

export default discardCardEpic
