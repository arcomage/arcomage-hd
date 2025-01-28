const checkLangStr = (str: string, langCode: string) => {
  const lang = langCode.toLowerCase().split('-')[0]

  // French checks
  if (lang === 'fr') {
    if (/'/g.test(str)) {
      console.log(`"${str}" (in French) contains "'" which should be "’"`)
    }
    if (/[^\u00A0][:;!?]/g.test(str)) {
      console.log(
        `"${str}" (in French) contains ":", ";", "!", or "?" not preceded by a nbsp`,
      )
    }
    if (/\d\.\d/g.test(str)) {
      console.log(
        `"${str}" (in French) contains decimal with "." - use "," instead`,
      )
    }
    if (/"\""/g.test(str)) {
      console.log(
        `"${str}" (in French) uses straight quotes "\"" - use "«", "»" instead`,
      )
    }
    if (/«[^\u00A0]|[^\u00A0]»/g.test(str)) {
      console.log(`"${str}" (in French) missing nbsp inside « »`)
    }
    if (/\d[^\u00A0]% /g.test(str)) {
      console.log(`"${str}" (in French) missing nbsp before %`)
    }
  }

  // German checks
  if (lang === 'de') {
    if (/"\""/g.test(str)) {
      console.log(
        `"${str}" (in German) uses straight quotes "\"" - use "„", "“" instead`,
      )
    }
    if (/\d\.\d/g.test(str)) {
      console.log(
        `"${str}" (in German) contains decimal with "." - use "," instead`,
      )
    }
  }

  // Spanish checks
  if (lang === 'es') {
    if (/\?/g.test(str) && !/¿.*\?/g.test(str)) {
      console.log(`"${str}" (in Spanish) contains "?" - use "¿" instead`)
    }
    if (/\!/g.test(str) && !/¡.*\!/g.test(str)) {
      console.log(`"${str}" (in Spanish) contains "!" - use "¡" instead`)
    }
  }

  // Chinese checks
  // temporarily disabled
  // if (lang === 'zh') {
  //   if (/[:;!?]/g.test(str)) {
  //     console.log(
  //       `"${str}" (in Chinese) uses Western punctuation - use：；！？instead`,
  //     )
  //   }
  //   if (/ /g.test(str)) {
  //     console.log(
  //       `"${str}" (in Chinese) contains spaces which are generally not used`,
  //     )
  //   }
  // }

  // Arabic checks
  if (lang === 'ar') {
    const signedNumbers = str.match(/[+-]\d+/g) || []
    const lrmSignedNumbers = str.match(/\u200E[+-]\d+/g) || []

    if (signedNumbers.length > lrmSignedNumbers.length) {
      const missingLrm = signedNumbers.filter(
        (num) => !str.includes(`\u200E${num}`),
      )
      console.log(
        `"${str}" (in Arabic) contains signed numbers without LRM mark (\\u200E): ${missingLrm.join(
          ', ',
        )}`,
      )
    }
  }

  // Italian checks
  if (lang === 'it') {
    if (/\d\.\d/g.test(str)) {
      console.log(
        `"${str}" (in Italian) contains decimal with "." - use "," instead`,
      )
    }
    if (/"\""/g.test(str)) {
      console.log(
        `"${str}" (in Italian) uses straight quotes "\"" - use "«", "»" instead`,
      )
    }
  }
}

import { langs as langArr } from '../../src/i18n/langs'
import { DataCardsI18nType, TavernsI18nType } from '../../src/i18n/types'

const langs: typeof langArr = langArr.filter((lang) => lang !== 'en')
langs.unshift('en')

const i18nPromises: Promise<{
  i18n: any
}>[] = langs.map((code) => import(`../../src/i18n/main/${code}`))
const cardsI18nPromises: Promise<{
  cardsI18n: DataCardsI18nType
}>[] = langs.map((code) => import(`../../src/i18n/cards/${code}`))
const tavernsI18nPromises: Promise<{
  tavernsI18n: TavernsI18nType
}>[] = langs.map((code) => import(`../../src/i18n/taverns/${code}`))

;(async () => {
  const i18nAllLangArr = (await Promise.all(i18nPromises)).map(({ i18n }) =>
    Object.values(i18n),
  )
  const cardsAllLangArr = (await Promise.all(cardsI18nPromises)).map(
    ({ cardsI18n }) => cardsI18n.flatMap(({ name, desc }) => [name, desc]),
  )
  const tavernsAllLangArr = (await Promise.all(tavernsI18nPromises)).map(
    ({ tavernsI18n }) =>
      tavernsI18n.flatMap(({ name, location }) => [name, location]),
  )

  langs.forEach((langCode, i) => {
    ;[
      ...i18nAllLangArr[i],
      ...cardsAllLangArr[i],
      ...tavernsAllLangArr[i],
    ].forEach((str) => {
      checkLangStr(str as string, langCode)
    })
  })
})()
