import {
  INIT,
  INIT_CORE,
  SEND,
  INIT_TO_QUEUE,
} from '../../constants/ActionTypes'
import { RootActionType } from '../../types/actionObj'
import { withLatestFrom, filter, concatMap } from 'rxjs/operators'
import { concat, EMPTY, of } from 'rxjs'
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
      const { forceGuestInit = false } = action
      const isHost =
        state.multiplayer.on && state.multiplayer.status === 'connected_to_id'
      // const isGuest =
      //   state.multiplayer.on && state.multiplayer.status === 'connected_by_id'

      const gameNumber = isHost ? new Date().getTime() : null // gameNumber is Host's game start UTC timestamp

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
          gameNumber,
        }),
        isHost
          ? of<RootActionType>({
              type: SEND,
              kind: INST,
              data: {
                type: forceGuestInit ? INIT_TO_QUEUE : INIT_CORE,
                playersTurn: !playersTurn,
                cardList: reverseCardList(cardList),
                gameNumber,
              },
            })
          : EMPTY,
      )
    }),
  )
