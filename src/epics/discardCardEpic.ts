import {
  CLEAR_CARD,
  DISCARD_CARD,
  DISCARD_CARD_MAIN,
  DRAW_CARD,
  NEXT_ROUND,
  REMOVE_CARD,
  SWITCH_DISCARD_MODE,
  SWITCH_LOCK,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, mergeMap, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { of, concat } from 'rxjs'
import playSound from '../utils/playSound'
import { cardTransitionDurationMs } from '../constants/transition'

export const discardCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(DISCARD_CARD)),
    withLatestFrom(state$),
    mergeMap(([{ index, position, owner }, state]) => {
      playSound('deal')
      return concat(
        of({
          type: CLEAR_CARD,
        }),
        of({
          type: DISCARD_CARD_MAIN,
          index,
        }),
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
