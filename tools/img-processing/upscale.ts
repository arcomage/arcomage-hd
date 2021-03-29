/**
 * Instead of using this script and npm waifu2x package,
 * it is preferable to use
 * waifu2x-caffe (https://github.com/lltcggie/waifu2x-caffe/releases) on Windows
 */

// import waifu2x from 'waifu2x'
// import fs from 'fs'
// import path from 'path'

// const extractedDir = './extracted'
// const outputDir = './output'

// const _extractedDir = path.join(__dirname, extractedDir)
// const _outputDir = path.join(__dirname, outputDir)

// /**
//  * upscale all images
//  * (cardback has already been prepared)
//  */

// fs.rmdirSync(_outputDir, { recursive: true })
// fs.mkdirSync(_outputDir)
// ;(async function () {
//   try {
//     /* Upscale an image. If you specify a directory for the destination, the default name will be originalName2x.
// You can optionally set the noise level (0/1/2/3), scale factor (default 2.0), mode (noise/scale/noise-scale), pngCompression (0-9), and jpgWebpQuality (0-101). */
//     await waifu2x.upscaleImages(_extractedDir, _outputDir, {
//       recursive: true,
//       noise: 3,
//       scale: 3.0,
//       rename: '',
//     })
//   } catch (e) {
//     console.error(e)
//   }
// })()
