import sharp from 'sharp'
import joinImages from 'join-images'
import fs from 'fs'
import path from 'path'

const originalDir = './original'
const extractedDir = './extracted'

const _originalDir = path.join(__dirname, originalDir)
const _extractedDir = path.join(__dirname, extractedDir)

/**
 * card crop & combine start
 */

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
fs.mkdirSync(_extractedDir, { recursive: true })
doFiles(
  path.join(_originalDir, 'main_en_fixed.png'),
  _extractedDir,
  88,
  52,
  4,
  240,
)

function handleRejectedAny(e: Error): void {
  // console.error(e)
}

/**
 * card crop & combine end
 */

/**
 * resources crop
 * (the tower tops, tower and wall have already been extracted)
 */

const mainSharp = sharp(path.join(_originalDir, 'main_en_fixed.png'))

mainSharp
  .extract({ left: 768, top: 3, width: 72, height: 52 })
  .toFile(path.join(_extractedDir, `res_1.png`))

mainSharp
  .extract({ left: 768, top: 75, width: 72, height: 52 })
  .toFile(path.join(_extractedDir, `res_2.png`))

mainSharp
  .extract({ left: 768, top: 147, width: 72, height: 52 })
  .toFile(path.join(_extractedDir, `res_3.png`))

/**
 * bg crop
 */

sharp(path.join(_originalDir, 'bg.png'))
  .extract({ left: 0, top: 0, width: 640, height: 311 })
  .toFile(path.join(_extractedDir, `bg.png`))

/**
 * copy tower_blue.png, tower_red.png, tower.png, wall.png
 * directly to the extracted folder
 */
;['tower_blue.png', 'tower_red.png', 'tower.png', 'wall.png'].forEach(
  (filename) => {
    fs.copyFile(
      path.join(_originalDir, filename),
      path.join(_extractedDir, filename),
      (err) => {
        if (err) {
          throw err
        }
      },
    )
  },
)

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
  const sharpOrig = sharp(path.join(_originalDir, fileName))

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
        await Promise.all(sharpList.map((sharp) => sharp.toBuffer())),
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
        .toFile(path.join(_extractedDir, fileName))
    } catch (e) {
      handleRejectedAny(e)
    }
  })()
}

combine('explosion.png', 960, 768, 5, 4)
combine('firework.png', 1536, 1280, 6, 5)
