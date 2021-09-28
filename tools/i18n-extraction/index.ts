// 7-2devents
// 7-mapstats
// 8-2devents
// 8-global
// 8-mapstats
// 8-npctext
// merge-2devents
// merge-global
// merge-mapstats
// merge-npctext

// extract tavern names and descriptions

import fs from 'fs'
import path from 'path'
import parse from 'csv-parse'
import { tavernsI18n } from '../../src/i18n/taverns/en'
import { TavernsI18nType } from '../../src/i18n/types'

const root = './tools/i18n-extraction/data'

const createPromise = (p: string): Promise<string[][]> =>
  new Promise((resolve, reject) => {
    const csvData: any[] = []
    fs.createReadStream(p)
      .pipe(
        parse({
          relax_column_count: true,
          delimiter: '\t',
          quote: '',
          trim: true,
        }),
      )
      .on('data', (csvrow) => {
        csvData.push(csvrow)
      })
      .on('end', () => {
        resolve(csvData)
      })
  })

const getRC = (arr2d: string[][], str: string): [number, number] | null => {
  let column = -1
  const row = arr2d.findIndex((row0) => {
    column = row0.findIndex((el) => el.toLowerCase() === str.toLowerCase())
    return column !== -1
  })
  if (row !== -1 && column !== -1) {
    return [row, column]
  } else {
    return null
  }
}

;(async () => {
  const twodEvents = {
    en: await createPromise(path.join(root, '7-2devents', 'en.txt')),
    fr: await createPromise(path.join(root, '7-2devents', 'fr.txt')),
    de: await createPromise(path.join(root, '7-2devents', 'de.txt')),
    es: await createPromise(path.join(root, '7-2devents', 'es.txt')),
    it: await createPromise(path.join(root, '7-2devents', 'it.txt')),
    ru: await createPromise(path.join(root, '7-2devents', 'ru.txt')),
    cs: await createPromise(path.join(root, '7-2devents', 'cs.txt')),
    pl: await createPromise(path.join(root, '7-2devents', 'pl.txt')),
    zhHans: await createPromise(path.join(root, '7-2devents', 'zh-Hans.txt')),
    zhHant: await createPromise(path.join(root, '7-2devents', 'zh-Hant.txt')),

    // en: await createPromise(path.join(root, '8-2devents', 'en.txt')),
    // fr: await createPromise(path.join(root, '8-2devents', 'fr.txt')),
    // de: await createPromise(path.join(root, '8-2devents', 'de.txt')),
    // es: await createPromise(path.join(root, '8-2devents', 'es.txt')),
    // it: await createPromise(path.join(root, '8-2devents', 'it.txt')),
    // ru: await createPromise(path.join(root, '8-2devents', 'ru.txt')),
    // cs: await createPromise(path.join(root, '8-2devents', 'cs.txt')),
    // pl: await createPromise(path.join(root, '8-2devents', 'pl.txt')),
    // zhHans: await createPromise(path.join(root, '8-2devents', 'zh-Hans.txt')),
    // zhHant: await createPromise(path.join(root, '8-2devents', 'zh-Hant.txt')),

    // en: await createPromise(path.join(root, 'merge-2devents', 'en.txt')),
  }

  const mapstats = {
    en: await createPromise(path.join(root, '7-mapstats', 'en.txt')),
    fr: await createPromise(path.join(root, '7-mapstats', 'fr.txt')),
    de: await createPromise(path.join(root, '7-mapstats', 'de.txt')),
    es: await createPromise(path.join(root, '7-mapstats', 'es.txt')),
    it: await createPromise(path.join(root, '7-mapstats', 'it.txt')),
    ru: await createPromise(path.join(root, '7-mapstats', 'ru.txt')),
    cs: await createPromise(path.join(root, '7-mapstats', 'cs.txt')),
    pl: await createPromise(path.join(root, '7-mapstats', 'pl.txt')),
    zhHans: await createPromise(path.join(root, '7-mapstats', 'zh-Hans.txt')),
    zhHant: await createPromise(path.join(root, '7-mapstats', 'zh-Hant.txt')),

    // en: await createPromise(path.join(root, '8-mapstats', 'en.txt')),
    // fr: await createPromise(path.join(root, '8-mapstats', 'fr.txt')),
    // de: await createPromise(path.join(root, '8-mapstats', 'de.txt')),
    // es: await createPromise(path.join(root, '8-mapstats', 'es.txt')),
    // it: await createPromise(path.join(root, '8-mapstats', 'it.txt')),
    // ru: await createPromise(path.join(root, '8-mapstats', 'ru.txt')),
    // cs: await createPromise(path.join(root, '8-mapstats', 'cs.txt')),
    // pl: await createPromise(path.join(root, '8-mapstats', 'pl.txt')),
    // zhHans: await createPromise(path.join(root, '8-mapstats', 'zh-Hans.txt')),
    // zhHant: await createPromise(path.join(root, '8-mapstats', 'zh-Hant.txt')),

    // en: await createPromise(path.join(root, 'merge-mapstats', 'en.txt')),
  }

  const getTavernNameInLang = (
    tavernName: string,
    lang: keyof typeof twodEvents,
  ) => {
    const rc = getRC(twodEvents.en, tavernName)
    if (rc !== null) {
      const [row, column] = rc
      return twodEvents[lang][row][column]
    } else {
      return null
    }
  }

  const getLocationNameInLang = (
    locationName: string,
    lang: keyof typeof mapstats,
  ) => {
    const rc = getRC(mapstats.en, locationName)
    if (rc !== null) {
      const [row, column] = rc
      return mapstats[lang][row][column]
    } else {
      return null
    }
  }

  const langs = [
    'en',
    'fr',
    'de',
    'es',
    'it',
    'ru',
    'cs',
    'pl',
    'zhHans',
    'zhHant',
  ] as const

  const all = langs.map((lang) => {
    const tavernsI18nTemp: TavernsI18nType = JSON.parse(
      JSON.stringify(tavernsI18n),
    )
    tavernsI18nTemp.forEach((tavern) => {
      tavern.name = getTavernNameInLang(tavern.name, lang) ?? ''
      tavern.location = getLocationNameInLang(tavern.location, lang) ?? ''
    })
    return tavernsI18nTemp
  })
  const resultJson = JSON.stringify(all, null, 2)
  fs.writeFileSync(path.join(root, '../output.json'), resultJson)
})()
