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
  MOVE_CENTER_CARD_TO_TOP,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import {
  map,
  withLatestFrom,
  filter,
  mergeMap,
  delay,
  concatMap,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { concat, interval, merge, Observable, of } from 'rxjs'
import playSound from '../utils/playSound'
import cards from '../data/cards'
import {
  cardNextStepTimeoutMs,
  cardTransitionDurationMs,
} from '../constants/transition'

export const useCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(USE_CARD)),
    mergeMap(({ n, index, position, owner }) => {
      const special = cards[n].special
      playSound('deal')
      return concat(
        of({
          type: CLEAR_CARD,
        }),
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
              }),
              of({
                type: MOVE_CENTER_CARD_TO_TOP,
              }).pipe(delay(cardTransitionDurationMs + cardNextStepTimeoutMs)),
              of({
                type: SWITCH_LOCK,
              }),
            )
          : concat(
              of({
                type: MOVE_CARD_TO_TOP,
                index,
              }).pipe(delay(cardTransitionDurationMs + cardNextStepTimeoutMs)),
              special?.playagain
                ? concat(
                    of({
                      type: DRAW_CARD,
                    }),
                    of({
                      type: SWITCH_LOCK,
                    }),
                  )
                : of({
                    type: NEXT_ROUND,
                    index,
                  }).pipe(delay(cardTransitionDurationMs)),
            ),
      )
    }),
  )

// action$.filter(isOfType(USE_CARD))
//   .mergeMapTo(Observable.of({ type: 'FETCH_REQUEST' })
//     .concat(Observable.of({ type: 'FETCH_SUCCESS' })
//       .delay(1000)))

export default useCardEpic
