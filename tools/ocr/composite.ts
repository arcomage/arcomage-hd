import sharp from 'sharp'
import fs from 'fs'
import path from 'path'
import locales from './locales'

const resDir = './res'
const extractedDir = './extracted'

const _resDir = path.join(__dirname, resDir)
const _extractedDir = path.join(__dirname, extractedDir)

;(async () => {
  const red = await sharp(path.join(_resDir, 'red.png')).toBuffer()
  const blue = await sharp(path.join(_resDir, 'blue.png')).toBuffer()
  const green = await sharp(path.join(_resDir, 'green.png')).toBuffer()

  locales.forEach((locale) => {
    fs.mkdirSync(path.join(_extractedDir, locale, 'desc'), { recursive: true })
    let promises: Promise<sharp.OutputInfo>[] = []
    for (let t = 0; t < 3; t++) {
      for (let i = 0; i < 34; i++) {
        try {
          promises.push(
            sharp(
              path.join(_extractedDir, locale, 'desc_temp', `${t}_${i}.png`),
            )
              .composite([
                { input: [red, blue, green][t], gravity: 'southeast' },
              ])
              .toFile(
                path.join(_extractedDir, locale, 'desc', `${t}_${i}.png`),
              ),
          )
        } catch (e) {
          console.log(e)
        }
      }
    }
    Promise.all(promises).then(() => {
      fs.rmdirSync(path.join(_extractedDir, locale, 'desc_temp'), {
        recursive: true,
      })
    })
  })
})()
