import { ofType, StateObservable } from 'redux-observable'
import { merge, Observable, of } from 'rxjs'
import { withLatestFrom, delay, mergeMap, takeUntil } from 'rxjs/operators'
import {
  CLEAR_CARD,
  DELETE_CARD,
  ABORT_ALL,
  MOVE_CARD_TO_STACK,
  SWITCH_NEW_TURN,
  SET_ZERO_OPACITY,
} from '@/constants/ActionTypes'
import { cardTransitionDuration } from '@/constants/visuals'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

const topArr = [-2, -3, -4]

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    ofType(CLEAR_CARD),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const obs: Observable<RootActionType>[] = []
      const obs1: Observable<RootActionType>[] = []
      const obs2: Observable<RootActionType>[] = []
      topArr.forEach((p) => {
        state.cards.list.forEach((card, index) => {
          if (card !== null && card.position === p) {
            obs.push(
              of<RootActionType>({
                type: MOVE_CARD_TO_STACK,
                index,
              }),
            )
            obs1.push(
              of<RootActionType>({
                type: SET_ZERO_OPACITY,
                index,
              }).pipe(delay(cardTransitionDuration)),
            )
            obs2.push(
              of<RootActionType>({
                type: DELETE_CARD,
                index,
              }).pipe(delay(cardTransitionDuration * 2)),
            )
          }
        })
      })
      return merge(
        of<RootActionType>({
          type: SWITCH_NEW_TURN,
          on: false,
        }),
        merge(...obs, ...obs1, ...obs2),
      ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
