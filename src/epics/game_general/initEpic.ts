import { INIT, INIT_NO_EFFECT, ABORT_ALL } from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardListItemAllType, RootStateType } from '../../types/state'
import { randomWithProbs } from '../../utils/randomWithProbs'

export default (
  action$: ActionsObservable<RootActionType>,
  state$: StateObservable<RootStateType>,
) =>
  action$.pipe(
    filter(isOfType(INIT)),
    withLatestFrom(state$),
    concatMap(([action, state]) => {
      const playersTurn = Math.random() < 0.5
      const cardList: CardListItemAllType[] = []
      const total = state.settings.cardsInHand
      for (let i = 0, l = total * 2; i < l; i++) {
        const card: CardListItemAllType = {
          position: i % total,
          n: randomWithProbs(),
          unusable: false,
          discarded: false,
          isFlipped: false,
          zeroOpacity: false,
          owner: i < total ? 'player' : 'opponent',
        }
        cardList.push(card)
      }

      return of<RootActionType>({
        type: INIT_NO_EFFECT,
        playersTurn,
        cardList,
      }).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
