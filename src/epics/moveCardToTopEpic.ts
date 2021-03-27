import {
  MOVE_CARD_TO_TOP,
  MOVE_CARD_TO_TOP_MAIN,
  CLEAR_CARD,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, delay } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { concat, EMPTY, of } from 'rxjs'

const topArr = [-2, -3, -4]

export const moveCardToTopEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(MOVE_CARD_TO_TOP)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const l = state.cards.list
      const c = l[action.index]

      if (c !== null && topArr.includes(c.position) === false) {
        const indexFound = topArr.findIndex((p) =>
          l.every((card) => card?.position !== p),
        )

        if (indexFound === -1) {
          // throw new Error('Top line is full!')
          return concat(
            of({
              type: CLEAR_CARD,
            }),
            of({
              type: MOVE_CARD_TO_TOP,
              index: action.index,
            }),
          )
        }

        return of({
          type: MOVE_CARD_TO_TOP_MAIN,
          index: action.index,
          toPosition: topArr[indexFound],
        })
      }
      return EMPTY
    }),
  )

export default moveCardToTopEpic
