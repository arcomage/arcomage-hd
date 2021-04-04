import { canDiscardUndiscardableWhenDDP } from '../constants/devSettings'
import cards from '../data/cards'
import { AiCardListItemType } from '../types/ai'
import { ownerType2, RootStateType } from '../types/state'

const checkCardUseDiscard = (
  state: RootStateType,
  owner: ownerType2,
): AiCardListItemType[] => {
  const { discardMode } = state.game
  const stateCardList = state.cards.list
  const cardList: AiCardListItemType[] = []
  stateCardList.forEach((card, index) => {
    if (card !== null && card.owner === owner) {
      let canuse = false
      let candiscard = false

      // locked is not checked here anymore, but be careful about it
      // if (state.game.locked) {
      //   throw new Error(
      //     "Error: can't be perform card usability check when locked. Please report the bug.",
      //   )
      // }

      const { n } = card
      if (discardMode) {
        if (
          canDiscardUndiscardableWhenDDP ||
          !cards[n].special?.undiscardable
        ) {
          candiscard = true
        }
      } else if (!card.unusable) {
        canuse = true
      }

      if (
        !cards[n].special?.undiscardable ||
        (discardMode && canDiscardUndiscardableWhenDDP)
      ) {
        candiscard = true
      }

      cardList.push({ index, n, score: 0, canuse, candiscard })
    }
  })

  return cardList
}

export default checkCardUseDiscard
