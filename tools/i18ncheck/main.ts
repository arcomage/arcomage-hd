import { langs } from '../../src/i18n/langs'
import { i18n as i18nEn } from '../../src/i18n/main/en'
import { entries, keys, hasOwnProperty } from '../../src/utils/typeHelpers'

const langEntries = entries(langs)

const i18nPromises: Promise<Record<string, string>>[] = langEntries.map(
  ([code, _]) => import(`../../src/i18n/main/${code}`),
)

;(async () => {
  const i18nStrs = (await Promise.all(i18nPromises)).map((o) => o.i18n)
  // console.log(i18nStrs)
  const i18nEnLen = Object.keys(i18nEn).length
  for (let i = 1, l = i18nStrs.length; i < l; i++) {
    const i18n = i18nStrs[i]
    const langCode = langEntries[i][0]
    const lang = langEntries[i][1]
    const i18nLen = Object.keys(i18n).length
    if (i18nLen !== i18nEnLen) {
      console.log(
        `${lang} (${langCode}) has incorrect string count ${i18nLen} (it should be ${i18nEnLen})`,
      )
    }
    keys(i18nEn).forEach((key) => {
      if (hasOwnProperty(i18n, key) && i18n[key] === i18nEn[key]) {
        console.log(
          `${lang} (${langCode}) has a string that is the same as in the English version: "${i18n[key]}"`,
        )
      }
    })
  }
})()
