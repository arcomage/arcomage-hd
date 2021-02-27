import sharp from 'sharp'
import mergeImg from 'merge-img'
import fs from 'fs'
import path from 'path'

const originalDir = './original'
const extractedDir = './extracted'

const _originalDir = path.join(__dirname, originalDir)
const _extractedDir = path.join(__dirname, extractedDir)

/**
 * card crop & combine start
 */

fs.rmdirSync(_extractedDir, { recursive: true })
fs.mkdirSync(_extractedDir)

const mainSharp = sharp(path.join(_originalDir, 'main_en_fixed.png'))

const w = 88
const h = 52

let x = 4
let y = 240

let xInterval = 96
let yInterval = 128

const promises: Promise<sharp.OutputInfo>[][] = [[], [], []]

function exe(type: number): void {
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
      promises[type].push(
        mainSharp
          .extract({ left: xTemp, top: yTemp, width: w, height: h })
          .toFile(path.join(_extractedDir, `${type}_${count}.png`)),
      )
      count++
      if (count === 34) {
        return
      }
    }
  }
}

function handleRejectedAny(e: Error): void {
  // console.log(e)
}

// const mergePromises: Promise<boolean>[] = []

for (let type = 0; type < 3; type++) {
  exe(type)

  // /**
  //  * combine all images
  //  * not needed for the moment
  //  */
  // Promise.all(promises[type])
  //   .then((_) => {
  //     mergeImg(
  //       [...Array(34).keys()].map((i) =>
  //         path.join(_extractedDir, `${type}_${i}.png`),
  //       ),
  //     )
  //       .then((img) => {
  //         mergePromises.push(
  //           new Promise((resolve, reject) => {
  //             try {
  //               img.write(path.join(_extractedDir, `${type}_all.png`), () => {
  //                 console.log(`${type}_all.png done`)
  //                 resolve(true)
  //               })
  //             } catch (e) {
  //               reject(e)
  //             }
  //           }),
  //         )
  //       })
  //       .then((_) => {
  //         const combinedImgArr = [0, 1, 2].map((i) =>
  //           path.join(_extractedDir, `${i}_all.png`),
  //         )
  //         Promise.all(mergePromises)
  //           .then((_) => {
  //             mergeImg(combinedImgArr, { direction: true })
  //               .then((img) => {
  //                 img.write(path.join(_extractedDir, 'all.png'), () => {
  //                   console.log('all.png done')
  //                   combinedImgArr.forEach((item) => {
  //                     fs.unlinkSync(item)
  //                   })
  //                 })
  //               })
  //               .catch(handleRejectedAny)
  //           })
  //           .catch(handleRejectedAny)
  //       })
  //       .catch(handleRejectedAny)
  //   })
  //   .catch(handleRejectedAny)
}

/**
 * card crop & combine end
 */

/**
 * resources crop
 * (the tower tops, tower and wall have already been extracted)
 */

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

const explSharp = sharp(path.join(_originalDir, 'explosion.png'))

const explPromises: Promise<sharp.OutputInfo>[] = []

for (let n = 0; n < 4; n++) {
  explPromises.push(
    explSharp
      .extract({ left: 0, top: (768 / 4) * n, width: 960, height: 768 / 4 })
      .toFile(path.join(_extractedDir, `explosion_${n}.png`)),
  )
}
Promise.all(explPromises).then((_) => {
  mergeImg(
    [...Array(4).keys()].map((i) =>
      path.join(_extractedDir, `explosion_${i}.png`),
    ),
  )
})

const explosionImgArr = [...Array(4).keys()].map((i) =>
  path.join(_extractedDir, `explosion_${i}.png`),
)

Promise.all(explPromises).then((_) => {
  mergeImg(explosionImgArr, { direction: false })
    .then((img) => {
      img.write(path.join(_extractedDir, 'explosion.png'), () => {
        console.log('explosion.png done')
        explosionImgArr.forEach((item) => {
          fs.unlinkSync(item)
        })
      })
    })
    .catch(handleRejectedAny)
})
