import { langs as langArr, langInfo } from '../../src/i18n/langs'
import { DataCardsI18nType } from '../../src/i18n/types'

// theoretically the langs imported from src/i18n/langs is not ordered
// this makes sure 'en' is the first one
const langs: typeof langArr = langArr.filter((lang) => lang !== 'en')
langs.unshift('en')

const i18nPromises: Promise<{
  cardsI18n: DataCardsI18nType
}>[] = langs.map((code) => import(`../../src/i18n/cards/${code}`))

const arraysEqual = (a: unknown[] | null, b: unknown[] | null) => {
  if (a === b) {
    return true
  }
  if (a === null || b === null) {
    return false
  }
  if (a.length !== b.length) {
    return false
  }
  for (let i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) {
      return false
    }
  }
  return true
}

;(async () => {
  const i18nStrs = await Promise.all(i18nPromises)
  for (let i = 1, l = i18nStrs.length; i < l; i++) {
    const i18n = i18nStrs[i].cardsI18n
    const i18nEn = i18nStrs[0].cardsI18n
    i18nEn.forEach(({ name, desc }, index) => {
      const nameCur = i18n[index].name
      const descCur = i18n[index].desc
      if (/(_|\n)/.test(nameCur)) {
        console.log(
          `${
            langInfo[langs[i]].en
          } ${index} name "${nameCur}" contains "_" or "\\n"`,
        )
      }
      if (/(_|\n)/.test(descCur)) {
        console.log(
          `${
            langInfo[langs[i]].en
          } ${index} desc "${descCur}" contains "_" or "\\n"`,
        )
      }
      const regex = /\d+/g
      const found = desc.match(regex)
      const foundCur = descCur.match(regex)
      if (!arraysEqual(found, foundCur)) {
        console.log(
          `${
            langInfo[langs[i]].en
          } ${index} desc "${descCur}" 's numbers do not match the numbers in ${
            langInfo.en.en
          } ${index} desc "${desc}"`,
        )
      }
    })
  }
})()
