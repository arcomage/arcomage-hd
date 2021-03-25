import {
  CLEAR_CARD,
  DELETE_CARD,
  MOVE_CARD_TO_STACK,
  SWITCH_NEW_TURN,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, delay, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { concat, merge, Observable, of } from 'rxjs'
import { cardTransitionDurationMs } from '../constants/transition'

export const clearCardEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(CLEAR_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const obs: Observable<ActionType>[] = []
      const obs2: Observable<ActionType>[] = []
      ;[-2, -3, -4].forEach((p) => {
        state.cards.list.forEach((card, index) => {
          if (card !== null && card.position === p) {
            obs.push(
              of({
                type: MOVE_CARD_TO_STACK,
                index,
              }),
            )
            obs2.push(
              of({
                type: DELETE_CARD,
                index,
              }).pipe(delay(cardTransitionDurationMs * 2)),
            )
          }
        })
      })
      return concat(
        of({
          type: SWITCH_NEW_TURN,
        }),
        merge(...obs, ...obs2),
      )
    }),
  )

export default clearCardEpic
