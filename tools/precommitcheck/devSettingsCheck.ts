import cards from '../../src/data/cards'
import cardProbs from './cardProbs'

import {
  disableContextMenu,
  enableWindowUnloadWarning,
  hideOpponentCard,
  useAi,
  noAiExtraDelay,
  noLatency,
} from '../../src/constants/devSettings'

const devSettingsAllTrue =
  disableContextMenu &&
  enableWindowUnloadWarning &&
  hideOpponentCard &&
  useAi &&
  noAiExtraDelay &&
  noLatency

const cardProbsOk = cards.every((card, i) => card.prob === cardProbs[i])

if (!devSettingsAllTrue) {
  throw new Error('All devSettings (except some) must be set to `true`!')
}

if (!cardProbsOk) {
  throw new Error('One or several card probs are modified!')
}
