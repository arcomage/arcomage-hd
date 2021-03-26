/// <reference path="./opencc.d.ts" />

import fs from 'fs'
import { Converter } from 'opencc-js'

const convert = Converter({ from: 'cn', to: 'twp' })

const filePrefixes = ['cards.', '']

filePrefixes.forEach(async (filePrefix) => {
  const data = await fs.promises.readFile(
    `./src/i18n/${filePrefix}zh-Hans.ts`,
    'utf8',
  )
  await fs.promises.writeFile(
    `./src/i18n/${filePrefix}zh-Hant.ts`,
    (await convert)(data),
  )
  console.log(`File "${filePrefix}zh-Hant.json" has been saved!`)
})
