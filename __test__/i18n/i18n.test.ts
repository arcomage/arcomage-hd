import { it, expect, describe, beforeEach } from 'bun:test'
import { langs, defaultLang } from '../../src/i18n/langs'
import cards from '../../src/data/cards'
import { preSettings } from '../../src/data/preSettings'
import path from 'path'

const mainBasePath = '../../src/i18n/main'
const cardsBasePath = '../../src/i18n/cards'
const tavernsBasePath = '../../src/i18n/taverns'

describe('i18n all good', () => {
  let defaultI18n: Record<string, string>
  const cardLength = cards.length
  const tavernLength = preSettings.length
  beforeEach(async () => {
    if (defaultI18n === undefined) {
      defaultI18n = (await import(path.join(mainBasePath, defaultLang))).i18n
    }
  })

  for (const lang of langs) {
    it(`${lang} main is good`, async () => {
      const { i18n } = await import(path.join(mainBasePath, lang))
      expect(
        Object.keys(defaultI18n).every(
          (key) => i18n[key] !== undefined && i18n[key] !== '',
        ),
      ).toBeTruthy()
    })

    it(`${lang} cards is good`, async () => {
      const { cardsI18n } = await import(path.join(cardsBasePath, lang))
      expect(cardsI18n.length).toBe(cardLength)
      expect(
        cardsI18n.every(
          ({ name, desc }: { name: string; desc: string }) =>
            name !== undefined &&
            name !== '' &&
            desc !== undefined &&
            desc !== '',
        ),
      ).toBeTruthy()
    })

    it(`${lang} taverns is good`, async () => {
      const { tavernsI18n } = await import(path.join(tavernsBasePath, lang))
      expect(tavernsI18n.length).toBe(tavernLength)
      expect(
        tavernsI18n.every(
          ({ name, location }: { name: string; location: string }) =>
            name !== undefined &&
            name !== '' &&
            location !== undefined &&
            location !== '',
        ),
      ).toBeTruthy()
    })
  }
})
