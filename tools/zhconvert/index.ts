/// <reference path="./opencc.d.ts" />

import fs from 'fs'
import { Converter } from 'opencc-js'

import { specialStrings, specialStringsAfter } from './specialStrings'

const convert = Converter({ from: 'cn', to: 'twp' })

const folders = ['cards', 'main'] // do not convert 'taverns'

const replaceAll = (str: string, replacementPairs: Record<string, string>) =>
  Object.entries(replacementPairs).reduce(
    (text, [from, to]) =>
      text.replace(
        new RegExp(from.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
        to,
      ),
    str,
  )

folders.forEach(async (folder) => {
  const data = await fs.promises.readFile(
    `./src/i18n/${folder}/zh-Hans.ts`,
    'utf8',
  )
  const output = (await convert)(replaceAll(data, specialStrings))
  const outputFinal = replaceAll(output, specialStringsAfter)

  await fs.promises.writeFile(`./src/i18n/${folder}/zh-Hant.ts`, outputFinal)
  console.log(`File "${folder}/zh-Hant.json" has been saved!`)
})
