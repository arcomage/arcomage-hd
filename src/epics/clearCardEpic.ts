import {
  CLEAR_CARD,
  DELETE_CARD,
  ABORT_ALL,
  MOVE_CARD_TO_STACK,
  SWITCH_NEW_TURN,
} from '../constants/ActionTypes'
import { RootActionType } from '../types/actionObj'
import {
  withLatestFrom,
  filter,
  delay,
  mergeMap,
  takeUntil,
} from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { RootStateType } from '../types/state'
import { concat, merge, Observable, of } from 'rxjs'
import { cardTransitionDurationMs } from '../constants/visuals'

const topArr = [-2, -3, -4]

export const clearCardEpic = (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CLEAR_CARD)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const obs: Observable<RootActionType>[] = []
      const obs2: Observable<RootActionType>[] = []
      topArr.forEach((p) => {
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
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )

export default clearCardEpic
