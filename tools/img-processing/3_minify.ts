import fs from 'fs'
import { cpus } from 'os'
import path from 'path'
import { ImagePool } from '@squoosh/lib'
import {
  QuantOptions,
  ResizeOptions,
  RotateOptions,
} from '@squoosh/lib/build/codecs'

const inputDir = './2_after_upscale'
const inputDir2 = './2_no_preprocess'
const outputDir = './3_final'

const cardsDir = 'cards'

const _inputDir = path.join(__dirname, inputDir)
const _inputDir2 = path.join(__dirname, inputDir2)
const _outputDir = path.join(__dirname, outputDir)

if (fs.existsSync(_outputDir)) {
  fs.rmdirSync(_outputDir, { recursive: true })
}
fs.mkdirSync(path.join(_outputDir, cardsDir), { recursive: true })

const imagePool = new ImagePool(cpus().length)

async function processImage(
  filePath: string,
  outputPath: string,
  preprocessOptions?: {
    resize?: Partial<Omit<ResizeOptions, 'width' | 'height'>> &
      (Pick<ResizeOptions, 'width'> | Pick<ResizeOptions, 'height'>)
    quant?: Partial<QuantOptions>
    rotate?: Partial<RotateOptions>
  },
) {
  const image = imagePool.ingestImage(await fs.promises.readFile(filePath))
  await image.preprocess(preprocessOptions)
  await image.encode({ webp: {} })
  const result = image.encodedWith.webp
  if (!result) {
    throw new Error('Failed to encode image')
  }
  await fs.promises.writeFile(outputPath, result.binary)
  console.log(`Processed: ${outputPath}`)
}

async function optimizeImages() {
  // Process card images
  const cardDir = path.join(_inputDir, cardsDir)
  const cardFiles = await fs.promises.readdir(cardDir)

  for (const file of cardFiles) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(cardDir, file)
      const outputPath = path.join(
        _outputDir,
        cardsDir,
        `${path.parse(file).name}.webp`,
      )

      await processImage(inputPath, outputPath)
    }
  }

  // Process other images in _inputDir
  const files = await fs.promises.readdir(_inputDir)

  for (const file of files) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(_inputDir, file)
      const outputPath = path.join(_outputDir, `${path.parse(file).name}.webp`)

      if (file.startsWith('res_')) {
        await processImage(inputPath, outputPath, {
          resize: { width: 338 },
        })
      } else {
        await processImage(inputPath, outputPath)
      }
    }
  }

  // Process other images in _inputDir2
  const files2 = await fs.promises.readdir(_inputDir2)

  for (const file of files2) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(_inputDir2, file)
      const outputPath = path.join(_outputDir, `${path.parse(file).name}.webp`)

      await processImage(inputPath, outputPath)
    }
  }

  // Process other images in _inputDir2
  const cardsDir2 = path.join(_inputDir2, cardsDir)
  const cardsFiles2 = await fs.promises.readdir(cardsDir2)

  for (const file of cardsFiles2) {
    if (file.endsWith('.png')) {
      const inputPath = path.join(cardsDir2, file)
      const outputPath = path.join(_outputDir, cardsDir, `${path.parse(file).name}.webp`)

      await processImage(inputPath, outputPath)
    }
  }

  await imagePool.close()
}

optimizeImages().catch(console.error)
