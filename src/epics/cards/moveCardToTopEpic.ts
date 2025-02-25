import { ofType, StateObservable } from 'redux-observable'
import { concat, EMPTY, Observable, of } from 'rxjs'
import { withLatestFrom, filter, mergeMap, takeUntil } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import {
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_TOP_MAIN,
  CLEAR_CARD,
  ABORT_ALL,
} from '@/constants/ActionTypes'
import { RootActionType } from '@/types/actionObj'
import { RootStateType } from '@/types/state'

const topArr = [-2, -3, -4]

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(MOVE_CARD_TO_TOP)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const l = state.cards.list
      const c = l[action.index]

      if (c !== null && topArr.includes(c.position) === false) {
        const toPosition = topArr.find((p) =>
          l.every((card) => card?.position !== p),
        )

        if (toPosition === undefined) {
          // throw new Error('Top line is full!')
          return concat(
            of<RootActionType>({
              type: CLEAR_CARD,
            }),
            of<RootActionType>({
              type: MOVE_CARD_TO_TOP,
              index: action.index,
            }),
          ).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
        }

        return of<RootActionType>({
          type: MOVE_CARD_TO_TOP_MAIN,
          index: action.index,
          toPosition,
        }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
      }
      return EMPTY
    }),
  )
