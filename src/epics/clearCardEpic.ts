import {
  CLEAR_CARD,
  DELETE_CARD,
  MOVE_CARD_TO_STACK,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { concat, Observable, of } from 'rxjs'
import { cardTransitionDurationMs } from '../constants/transition'

export const clearCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(CLEAR_CARD)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const obs: Observable<ActionType>[] = []
      ;[-2, -3, -4].forEach((p) => {
        state.cards.list.forEach((card, index) => {
          if (card !== null && card.position === p) {
            obs.push(
              of({
                type: MOVE_CARD_TO_STACK,
                index,
              }),
              of({
                type: DELETE_CARD,
                index,
              }).pipe(delay(cardTransitionDurationMs * 2)),
            )
          }
        })
      })
      return concat(...obs)
    }),
  )

export default clearCardEpic
