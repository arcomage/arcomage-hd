import { createWorker } from 'tesseract.js'
import { locales, locales3L } from './locales'
import path from 'path'
import fs from 'fs'

const extractedDir = './extracted'
const outputDir = './output'

const _extractedDir = path.join(__dirname, extractedDir)
const _outputDir = path.join(__dirname, outputDir)

;(async () => {
  for (let k = 0, l = locales.length; k < l; k++) {
    const locale = locales[k]
    const locale3L = locales3L[k]

    const worker = createWorker()
    await worker.load()
    await worker.loadLanguage(locale3L)
    await worker.initialize(locale3L)

    const langObj = []

    for (let t = 0; t < 3; t++) {
      for (let i = 0; i < 34; i++) {
        const o: { name?: string; desc?: string } = {}
        for (const m of ['name' as const, 'desc' as const]) {
          const {
            data: { text },
          } = await worker.recognize(
            path.join(_extractedDir, locale, m, `${t}_${i}.png`),
          )
          o[m] = text
        }
        console.log(o)
        langObj.push(o)
      }
    }

    fs.mkdirSync(path.join(_outputDir), { recursive: true })
    const resultJson = JSON.stringify(langObj, null, 2)
    fs.writeFileSync(path.join(_outputDir, `${locale}.json`), resultJson)

    await worker.terminate()
  }
})()

// change po!!!!
