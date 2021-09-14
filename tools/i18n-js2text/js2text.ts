import fs from 'fs'
import path from 'path'

import { i18n } from '../../src/i18n/main/en'
import { cardsI18n } from '../../src/i18n/cards/en'
import { tavernsI18n } from '../../src/i18n/taverns/en'

const linesMain = Object.values(i18n)

const linesCards = cardsI18n
  .map((c) => Object.values(c))
  .reduce((acc, val) => acc.concat(val), [])

const linesTaverns = tavernsI18n
  .map((c) => Object.values(c))
  .reduce((acc, val) => acc.concat(val), [])

fs.writeFileSync(path.join(__dirname, 'main.txt'), linesMain.join('\n'))
fs.writeFileSync(path.join(__dirname, 'cards.txt'), linesCards.join('\n'))
fs.writeFileSync(path.join(__dirname, 'taverns.txt'), linesTaverns.join('\n'))
