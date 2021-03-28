import { canDiscardUndiscardableWhenDDP } from '../constants/devSettings'
import cards from '../data/cards'
import { AiCardListItemType } from '../types/ai'
import { RootStateType } from '../types/state'

const checkCardUseDiscard = (state: RootStateType): AiCardListItemType[] => {
  const { locked, discardMode } = state.game
  const stateCardList = state.cards.list
  const cardList: AiCardListItemType[] = []
  stateCardList.forEach((card, index) => {
    if (card !== null && card.owner === 'opponent') {
      cardList.push({ index, n: card.n })
    }
  })

  cardList.forEach((card) => {
    const { n } = card
    if (!locked) {
      if (discardMode) {
        if (
          canDiscardUndiscardableWhenDDP ||
          !cards[n].special?.undiscardable
        ) {
          card.candiscard = true
        }
      } else {
        card.canuse = true
      }
    }

    if (
      !locked &&
      (!cards[n].special?.undiscardable ||
        (discardMode && canDiscardUndiscardableWhenDDP))
    ) {
      card.candiscard = true
    }
  })

  return cardList
}

export default checkCardUseDiscard
