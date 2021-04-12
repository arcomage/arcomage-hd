import fs from 'fs'
import cards from '../../src/data/cards'

const cardProbs: number[] = cards.map(({ prob }) => prob)

const resultJson = JSON.stringify(cardProbs)
fs.writeFileSync(
  `./tools/precommitcheck/cardProbs.ts`,
  `// prettier-ignore
const cardProbs: number[] = ${resultJson}

export default cardProbs
`,
)
