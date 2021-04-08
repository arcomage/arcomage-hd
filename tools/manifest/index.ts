import path from 'path'
import fs from 'fs'
import manifestTmpl from '../../assets/logo/manifest.template'
import resizedSvgToSharp from './resizedSvgToSharp'

const faviconDir = path.join(__dirname, '../../assets/logo/')
const faviconOrigPath = path.join(faviconDir, 'favicon.svg')

/**
 * favicon generation
 */

manifestTmpl.pngIconSizes.forEach(async (size) => {
  const faviconSharp = await resizedSvgToSharp(faviconOrigPath, {
    width: size,
  })

  faviconSharp
    .png({ compressionLevel: 9 })
    .toFile(path.join(faviconDir, `favicon-${size}.png`))
    .catch(function (e) {
      console.log(e)
    })
})

/**
 * manifest.json
 */

const {
  pngIconSizes,
  faviconMaskableSvgSizes,
  iconNames,
  ...rest
} = manifestTmpl

const icons: any = pngIconSizes.map((i) => {
  const str = i.toString()
  return {
    src: iconNames.faviconPng.replace('%s', str),
    sizes: `${str}x${str}`,
    type: 'image/png',
  }
})

icons.push({
  src: iconNames.faviconSvg,
  sizes: '513x513',
  type: 'image/svg+xml',
})

icons.push({
  src: iconNames.faviconMaskableSvg,
  sizes: faviconMaskableSvgSizes.map((n) => `${n}x${n}`).join(' '),
  type: 'image/svg+xml',
  purpose: 'maskable',
})

const resultJson = JSON.stringify({ ...rest, icons }, null, 2)
fs.writeFileSync(path.join(faviconDir, 'manifest.json'), resultJson)
