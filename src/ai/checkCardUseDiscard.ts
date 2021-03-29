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
      let canuse = false
      let candiscard = false

      const { n } = card
      if (!locked) {
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
      }

      if (
        !locked &&
        (!cards[n].special?.undiscardable ||
          (discardMode && canDiscardUndiscardableWhenDDP))
      ) {
        candiscard = true
      }

      cardList.push({ index, n, score: 0, canuse, candiscard })
    }
  })

  return cardList
}

export default checkCardUseDiscard
