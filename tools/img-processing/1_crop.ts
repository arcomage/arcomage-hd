import fs from 'fs'
import path from 'path'
import joinImages from 'join-images'
import sharp from 'sharp'

const inputDir = './0_original'
const outputDir = './1_after_crop'

const cardsDir = 'cards'

const _inputDir = path.join(__dirname, inputDir)
const _outputDir = path.join(__dirname, outputDir)

if (fs.existsSync(_outputDir)) {
  fs.rmdirSync(_outputDir, { recursive: true })
}
fs.mkdirSync(path.join(_outputDir, cardsDir), { recursive: true })

/**
 * card crop
 */

const cardCountPerType = 34

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
          .clone()
          .extract({ left: xTemp, top: yTemp, width: w, height: h })
          .toFile(
            path.join(
              outFolder,
              cardsDir,
              `${type * cardCountPerType + count}.png`,
            ),
          )
        count++
        if (count === cardCountPerType) {
          return
        }
      }
    }
  }

  for (let type = 0; type < 3; type++) {
    doFileType(type)
  }
}

doFiles(path.join(_inputDir, 'main_en_fixed.png'), _outputDir, 88, 52, 4, 240)

function handleRejectedAny(_e: Error): void {
  // console.error(e)
}

/**
 * split and horizontally combine explosion.png
 */

const combine = (
  fileName: string,
  explosionW: number,
  explosionH: number,
  explosionWN: number,
  explosionHN: number,
) => {
  const sharpOrig = sharp(path.join(_inputDir, fileName))

  const sharpList: sharp.Sharp[] = []

  for (let n = 0; n < explosionHN; n++) {
    sharpList.push(
      sharpOrig.clone().extract({
        left: 0,
        top: (explosionH / explosionHN) * n,
        width: explosionW,
        height: explosionH / explosionHN,
      }),
    )
  }

  ;(async () => {
    try {
      const joinedImage = await joinImages(
        await Promise.all(sharpList.map((sharp0) => sharp0.toBuffer())),
        { direction: 'horizontal', color: { alpha: 0, r: 0, g: 0, b: 0 } },
      )

      const joinedImageBuffer = await joinedImage.png().toBuffer()

      sharp(joinedImageBuffer)
        .extend({
          top: 0,
          bottom: 0,
          left: explosionW / explosionWN,
          right: 0,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        })
        .toFile(path.join(_outputDir, fileName))
    } catch (e) {
      if (e instanceof Error) {
        handleRejectedAny(e)
      }
    }
  })()
}

combine('explosion.png', 960, 768, 5, 4)
combine('firework.png', 1536, 1280, 6, 5)

/**
 * copy all images that don't need to be cropped
 */
;[
  'res_1.png',
  'res_2.png',
  'res_3.png',
].forEach((filename) => {
  fs.copyFile(
    path.join(_inputDir, filename),
    path.join(_outputDir, filename),
    (err) => {
      if (err) {
        throw err
      }
    },
  )
})
