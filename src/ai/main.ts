import cards from '../data/cards'
import { AiCardListItemType, AiInstructionType } from '../types/ai'
import { StatusType, WinSettingsType } from '../types/state'

// cardList is a list of all opponent card state objects,
// each card state object includes two additional properties: canUse and canDiscard
export const aiDecision = (
  cardList: AiCardListItemType[],
  status: StatusType,
  winSettings: WinSettingsType,
): AiInstructionType => {
  const { player: p, opponent: o } = status
  // p and o are readonly

  for (const card of cardList) {
    const { index, n, canuse, candiscard } = card
    const { tower: winTower, resource: winResource } = winSettings
    const pAfter = { ...p }
    const oAfter = { ...o }
    cards[n].effect(oAfter, pAfter)
    if (
      canuse &&
      (oAfter.tower >= winTower ||
        oAfter.bricks >= winResource ||
        oAfter.gems >= winResource ||
        oAfter.recruits >= winResource)
    ) {
      return { index, use: true }
    } else {
    }
    card.score = 1
  }
  return { index: 8, use: true }
}
