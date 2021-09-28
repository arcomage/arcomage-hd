/// <reference path="./opencc.d.ts" />

import fs from 'fs'
import { Converter } from 'opencc-js'

import specialStrings from './specialStrings'

const convert = Converter({ from: 'cn', to: 'twp' })

const folders = ['cards', 'main'] // do not convert 'taverns'

folders.forEach(async (folder) => {
  const data = await fs.promises.readFile(
    `./src/i18n/${folder}/zh-Hans.ts`,
    'utf8',
  )
  await fs.promises.writeFile(
    `./src/i18n/${folder}/zh-Hant.ts`,
    (
      await convert
    )(
      Object.entries(specialStrings).reduce(
        (data0, [from, to]) =>
          data0.replace(
            new RegExp(from.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g'),
            to,
          ),
        data,
      ),
    ),
  )
  console.log(`File "${folder}/zh-Hant.json" has been saved!`)
})
