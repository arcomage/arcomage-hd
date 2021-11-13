import {
  CHECK_UNUSABLE,
  ABORT_ALL,
  SET_UNUSABLE,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, takeUntil, mergeMap } from 'rxjs/operators'
import { isOfType } from 'typesafe-actions'
import { ofType, StateObservable } from 'redux-observable'
import { CardListItemAllType, RootStateType } from '../../types/state'
import cards from '../../data/cards'
import { resNames } from '../../constants/resourceNames'
import { Observable, of } from 'rxjs'

export default (
  action$: Observable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(CHECK_UNUSABLE)),
    withLatestFrom(state$),
    mergeMap(([action, state]) => {
      const unusables: number[] = []
      const usables: number[] = []

      const payloadPush = (card: CardListItemAllType, i: number) => {
        if (card !== null) {
          const owner = !action.lastOnly
            ? card.owner
            : state.game.playersTurn
            ? 'player'
            : 'opponent'
          if (owner !== 'common') {
            const { type, cost } = cards[card.n]
            if (state.status[owner][resNames[type]] < cost) {
              if (!card.unusable) {
                unusables.push(i)
              }
            } else {
              if (card.unusable) {
                usables.push(i)
              }
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

      return of<RootActionType>({
        type: SET_UNUSABLE,
        unusables,
        usables,
      }).pipe(takeUntil(action$.pipe(ofType(ABORT_ALL))))
    }),
  )
