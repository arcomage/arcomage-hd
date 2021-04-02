import { allStatusNames, resNames } from '../constants/resourceNames'
import cards from '../data/cards'
import { AiCardListItemType, AiInstructionType } from '../types/ai'
import { PersonStatusType, StatusType, WinSettingsType } from '../types/state'
import { entries, fromEntries } from '../utils/typeHelpers'
import coefs from './coefs'

// cardList is a list of all opponent card state objects,
// each card state object includes two additional properties: canUse and canDiscard
export const aiDecision = (
  cardList: AiCardListItemType[],
  status: StatusType,
  winSettings: WinSettingsType,
): AiInstructionType => {
  // cardList is not frozen

  const { player: pBefore, opponent: oBefore } = status
  // p and o are readonly

  for (const card of cardList) {
    card.score = 0
    const { index, n, canuse } = card
    const dataCard = cards[n]
    const { type, cost, special, effect } = dataCard
    const { tower: winTower, resource: winResource } = winSettings
    const pAfter: PersonStatusType = { ...pBefore }
    const oAfter: PersonStatusType = { ...oBefore }
    effect(oAfter, pAfter)
    /**
     * win immediately (but not tie)
     */
    const winImm =
      oAfter.tower >= winTower ||
      oAfter.bricks >= winResource ||
      oAfter.gems >= winResource ||
      oAfter.recruits >= winResource ||
      pAfter.tower <= 0

    const loseImm =
      pAfter.tower >= winTower ||
      pAfter.bricks >= winResource ||
      pAfter.gems >= winResource ||
      pAfter.recruits >= winResource ||
      oAfter.tower <= 0

    if (canuse && winImm && !loseImm) {
      return { index, use: true }
    }

    /**
     * tie immediately
     */
    if (canuse && winImm && loseImm) {
      return { index, use: true }
    }

    const oDiff = fromEntries<PersonStatusType>(
      entries(oBefore).map(([key, value]) => [key, oAfter[key] - value]),
    )
    const pDiff = fromEntries<PersonStatusType>(
      entries(pBefore).map(([key, value]) => [key, pAfter[key] - value]),
    )

    oDiff[resNames[type]] -= cost

    const oScore = allStatusNames
      .map((statusName) => oDiff[statusName] * coefs[statusName])
      .reduce((a, b) => a + b, 0)

    // pScore here is positive
    const pScore = allStatusNames
      .map((statusName) => pDiff[statusName] * coefs[statusName] * coefs.enemy)
      .reduce((a, b) => a + b, 0)

    card.score += oScore - pScore

    if (special?.playagain) {
      card.score += coefs.playagain
    }

    if (special?.drawDiscardPlayagain) {
      card.score += coefs.drawDiscardPlayagain
    }

    if (special?.undiscardable) {
      card.score += coefs.undiscardable
    }

    if (loseImm) {
      card.score -= coefs.loseDeduction
    }
  }

  const scores = cardList.map((card, i) => ({
    card,
    use: true,
    scoreAll: card.score,
  }))

  const discardScores = cardList.map((card, i) => ({
    card,
    use: false,
    scoreAll: (card.score / coefs.useDiscardRatio) * -1,
  }))

  const allScores = scores
    .concat(discardScores)
    .filter((c) => (c.use && c.card.canuse) || (!c.use && c.card.candiscard))

  if (allScores.length === 0) {
    console.error('AI cannot find any usable or discardable card!')
  }

  const max = allScores.reduce((prev, current) =>
    prev.scoreAll > current.scoreAll ? prev : current,
  )

  return { index: max.card.index, use: max.use }
}
