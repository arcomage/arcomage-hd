import {
  CLEAR_CARD,
  USE_CARD,
  EXEC_CARD,
  MOVE_CARD_TO_CENTER,
  SWITCH_LOCK,
  REMOVE_CARD,
  RESOURCE_PROD,
  UPDATE_STATUS,
  DELETE_CARD,
  MOVE_CARD_TO_STACK,
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
import { resProdMap } from '../constants/resourceNames'
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
