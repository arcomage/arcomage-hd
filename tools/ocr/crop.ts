import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import { locales } from './locales'

const originalDir = './original'
const extractedDir = './extracted'

const _originalDir = path.join(__dirname, originalDir)
const _extractedDir = path.join(__dirname, extractedDir)

const doFiles = (
  file: string,
  outFolder: string,
  w: number,
  h: number,
  x: number,
  y: number,
): void => {
  const mainSharp = sharp(file)

  const xInterval = 96
  const yInterval = 128
  const doFileType = (type: number): void => {
    let xTemp = 0
    let yTemp = 0
    let count = 0
    const xInit = x
    const yInit = [y, y + 4 * yInterval, y + 8 * yInterval][type]
    let j = -1
    while (true) {
      j++
      yTemp = yInit + j * yInterval
      for (let i = 0; i < 10; i++) {
        xTemp = xInit + i * xInterval
        mainSharp
          .extract({ left: xTemp, top: yTemp, width: w, height: h })
          .toFile(path.join(outFolder, `${type}_${count}.png`)),
          count++
        if (count === 34) {
          return
        }
      }
    }
  }

  for (let type = 0; type < 3; type++) {
    doFileType(type)
  }
}

fs.rmdirSync(_extractedDir, { recursive: true })

locales.forEach((locale) => {
  fs.mkdirSync(path.join(_extractedDir, locale, 'name'), { recursive: true })
  doFiles(
    path.join(_originalDir, `${locale}.png`),
    path.join(_extractedDir, locale, 'name'),
    88,
    13,
    4,
    223,
  )

  fs.mkdirSync(path.join(_extractedDir, locale, 'desc_temp'), {
    recursive: true,
  })
  doFiles(
    path.join(_originalDir, `${locale}.png`),
    path.join(_extractedDir, locale, 'desc_temp'),
    90,
    53,
    3,
    292,
  )
})
