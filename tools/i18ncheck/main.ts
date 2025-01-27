import { langs as langArr, langInfo } from '../../src/i18n/langs'
import { i18n as i18nEn } from '../../src/i18n/main/en'
import { keys, hasOwnProperty } from '../../src/utils/typeHelpers'

// theoretically the langs imported from src/i18n/langs is not ordered
// this makes sure 'en' is the first one
const langs = langArr.filter((lang) => lang !== 'en')
langs.unshift('en' as (typeof langs)[number])

const i18nPromises: Promise<Record<string, string>>[] = langs.map(
  (code) => import(`../../src/i18n/main/${code}`),
)

const checkPlaceholders = (str1: string, str2: string) => {
  // regex for '%s', '%s0', '%s1', etc.
  const placeholderPattern = /%s\d*/g
  const placeholders1 = (str1.match(placeholderPattern) || []).sort()
  const placeholders2 = (str2.match(placeholderPattern) || []).sort()
  return JSON.stringify(placeholders1) === JSON.stringify(placeholders2)
}

;(async () => {
  const i18nStrs = (await Promise.all(i18nPromises)).map((o) => o.i18n)
  // console.log(i18nStrs)
  const i18nEnLen = Object.keys(i18nEn).length
  for (let i = 1, l = i18nStrs.length; i < l; i++) {
    const i18n = i18nStrs[i]
    const langCode = langs[i]
    const lang = langInfo[langs[i]].en
    const i18nLen = Object.keys(i18n).length
    if (i18nLen !== i18nEnLen) {
      console.log(
        `${lang} (${langCode}) has incorrect string count ${i18nLen} (it should be ${i18nEnLen})`,
      )
    }
    keys(i18nEn).forEach((key) => {
      if (hasOwnProperty(i18n, key)) {
        if (i18n[key] === i18nEn[key]) {
          console.log(
            `${lang} (${langCode}) has a string that is the same as in the English version: "${i18nEn[key]}"`,
          )
        } else if (!checkPlaceholders(i18n[key] as string, i18nEn[key])) {
          console.log(
            `The percentage placeholders "%s" in "${i18n[key]}" in ${lang} (${langCode}) version don't match English version's: "${i18nEn[key]}"`,
          )
        }
      }
    })
  }
})()
