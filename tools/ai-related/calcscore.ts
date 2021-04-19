import { allStatusNames, resNames } from '../../src/constants/resourceNames'
import { PersonStatusType, StatusType } from '../../src/types/state'
import cards from '../../src/data/cards'
import { defaultSettings } from '../../src/constants/defaultSettings'
import { preSettings } from '../../src/constants/preSettings'
import { entries, fromEntries } from '../../src/utils/typeHelpers'
import coefs from '../../src/ai/coefs'
import { cardsI18n } from '../../src/i18n/cards/en'
import fs from 'fs'

const settings = defaultSettings
// const settings = preSettings[5]

const status: StatusType = {
  player: settings,
  opponent: settings,
}

const { player: pBefore, opponent: oBefore } = status

const result = cards.map((card, i) => {
  const { type, cost, special, effect } = card

  const pAfter: PersonStatusType = { ...pBefore }
  const oAfter: PersonStatusType = { ...oBefore }

  effect(oAfter, pAfter)

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

  let score = 0

  score += oScore - pScore

  if (special?.playagain) {
    score += coefs.playagain
  }

  if (special?.drawDiscardPlayagain) {
    score += coefs.drawDiscardPlayagain
  }

  if (special?.undiscardable) {
    score += coefs.undiscardable
  }

  const { name, desc } = cardsI18n[i]

  return { name, desc, score }
})

const resultJson = JSON.stringify(result, null, 2)
fs.writeFileSync(`./tools/ai-related/output.json`, resultJson)
