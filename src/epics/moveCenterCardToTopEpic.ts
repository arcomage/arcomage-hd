import {
  CLEAR_CARD,
  DISCARD_CARD,
  DISCARD_CARD_MAIN,
  MOVE_CARD_TO_TOP,
  MOVE_CENTER_CARD_TO_TOP,
  REMOVE_CARD,
  SWITCH_LOCK,
} from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { map, withLatestFrom, filter, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { StateType } from '../types/state'
import { entries } from '../utils/typeHelpers'
import dataCards from '../data/cards'
import { Observable, merge, of, EMPTY } from 'rxjs'
import playSound from '../utils/playSound'

export const moveCenterCardToTopEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(MOVE_CENTER_CARD_TO_TOP)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const l = state.cards.list
      const len = l.length
      let index = 0
      for (; index < len; index++) {
        const card = l[index]
        if (card?.position === -5) {
          return of({
            type: MOVE_CARD_TO_TOP,
            index,
          })
        }
      }
      return EMPTY
    }),
  )

export default moveCenterCardToTopEpic
