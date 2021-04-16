import {
  INIT,
  INIT_CORE,
  ABORT_ALL,
  SEND,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, concatMap, takeUntil } from 'rxjs/operators'
import { concat, of } from 'rxjs'
import { isOfType } from 'typesafe-actions'
import { ActionsObservable, StateObservable } from 'redux-observable'
import { CardListItemAllType, RootStateType } from '../../types/state'
import { randomWithProbs } from '../../utils/randomWithProbs'
import { INST } from '../../constants/connDataKind'
import { reverseCardList } from '../../utils/reverseState'

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

      return concat(
        of<RootActionType>({
          type: INIT_CORE,
          playersTurn,
          cardList,
        }),
        of<RootActionType>({
          type: SEND,
          kind: INST,
          data: {
            type: INIT_CORE,
            playersTurn: !playersTurn,
            cardList: reverseCardList(cardList),
          },
        }),
      ).pipe(takeUntil(action$.ofType(ABORT_ALL)))
    }),
  )
