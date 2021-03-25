import { CHECK_UNUSABLE, SET_UNUSABLE } from '../constants/ActionTypes'
import { ActionType } from '../types/actionObj'
import { withLatestFrom, filter, concatMap, delay, map } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardListItemAllType, StateType } from '../types/state'
import { concat, Observable, of } from 'rxjs'
import { cardTransitionDurationMs } from '../constants/transition'
import cards from '../data/cards'
import { resNames } from '../constants/resourceNames'

export const checkUnusableEpic = (
  action$: ActionsObservable<ActionType>,
  state$: StateObservable<StateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_UNUSABLE)),
    withLatestFrom(state$),
    map(([action, state]) => {
      const payload: number[] = []

      const payloadPush = (card: CardListItemAllType, i: number) => {
        if (card !== null) {
          const owner = card.owner
          if (owner !== 'common') {
            const { type, cost } = cards[card.n]
            if (state.status[owner][resNames[type]] < cost) {
              payload.push(i)
            }
          }
        }
      }

      if (action.lastOnly) {
        const l = state.cards.list
        const lastIndex = l.length - 1
        const card = l[lastIndex]
        payloadPush(card, lastIndex)
      } else {
        state.cards.list.forEach(payloadPush)
      }

      return {
        type: SET_UNUSABLE,
        payload,
      }
    }),
  )

export default checkUnusableEpic
