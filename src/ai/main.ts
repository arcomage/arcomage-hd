import { allStatusNames, resNames } from '../constants/resourceNames'
import cards from '../data/cards'
import {
  AiCardListItemType,
  AiInstructionType,
  ScoreObjType,
} from '../types/ai'
import { PersonStatusType, StatusType, WinSettingsType } from '../types/state'
import { entries, fromEntries } from '../utils/typeHelpers'
import { coefs } from './coefs'
import { getMaxScore } from './getMaxScore'

const statusCoefs = (() => {
  const { bricks, gems, recruits, prod, tower, wall } = coefs
  return {
    bricks,
    gems,
    recruits,
    brickProd: bricks * prod,
    gemProd: gems * prod,
    recruitProd: recruits * prod,
    tower,
    wall,
  }
})()

// cardList is a list of all opponent card state objects,
// each card state object includes two additional properties: canUse and canDiscard
// `null` return value is a 'surrender' instruction
export const aiDecision = (
  cardList: AiCardListItemType[],
  status: StatusType,
  winSettings: WinSettingsType,
  aiLevel: number,
): AiInstructionType | null => {
  // you can edit the elements inside cardList

  const { player: pBefore, opponent: oBefore } = status
  // pBefore and oBefore are readonly

  for (const card of cardList) {
    card.score = 0

    const { index, n, canuse } = card
    const dataCard = cards[n]
    const { type, cost, special, effect } = dataCard
    const { winTower, winResource } = winSettings
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

    // =============================

    const oDiff = fromEntries<PersonStatusType>(
      entries(oBefore).map(([key, value]) => [key, oAfter[key] - value]),
    )
    const pDiff = fromEntries<PersonStatusType>(
      entries(pBefore).map(([key, value]) => [key, pAfter[key] - value]),
    )

    oDiff[resNames[type]] -= cost

    const oScore = allStatusNames
      .map((statusName) => oDiff[statusName] * statusCoefs[statusName])
      .reduce((a, b) => a + b, 0)

    // pScore here is positive
    const pScore = allStatusNames
      .map(
        (statusName) =>
          pDiff[statusName] * statusCoefs[statusName] * coefs.attack,
      )
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

    if (winImm && loseImm) {
      card.score += coefs.tieBonus
    }

    if (!winImm && loseImm) {
      card.score -= coefs.losePenalty
    }
  }

  const scores = cardList.map((card) => ({
    card,
    use: true,
    scoreAll: card.score,
  }))

  const discardScores = cardList.map((card) => ({
    card,
    use: false,
    scoreAll: (card.score / coefs.useDiscardRatio) * -1,
  }))

  const allScores: ScoreObjType[] = scores
    .concat(discardScores)
    .filter((c) => (c.use && c.card.canuse) || (!c.use && c.card.candiscard))

  if (allScores.length === 0) {
    // cannot find any usable or discardable card
    return null
  }

  const max = getMaxScore(allScores, aiLevel)

  return { index: max.card.index, use: max.use }
}
