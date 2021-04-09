import path from 'path'
import fs from 'fs'
import manifestTmpl from '../../assets/logo/manifest.template'
import resizedSvgToSharp from './resizedSvgToSharp'

const {
  faviconSvgToPngSizes,
  logoSvgToPngSizes,
  faviconMaskableSvgSizes,
  logoMaskableSvgSizes,
  iconNames,
  ...rest
} = manifestTmpl

const dir = path.join(__dirname, '../../assets/logo/')
const faviconOrigPath = path.join(dir, iconNames.faviconSvg)
const logoOrigPath = path.join(dir, iconNames.logoSvg)

/**
 * favicon generation
 */

faviconSvgToPngSizes.forEach(async (size) => {
  const faviconSharp = await resizedSvgToSharp(faviconOrigPath, {
    width: size,
  })

  faviconSharp
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, iconNames.faviconPng.replace('%s', size.toString())))
    .catch(function (e) {
      console.log(e)
    })
})

/**
 * logo generation
 */

logoSvgToPngSizes.forEach(async (size) => {
  const logoSharp = await resizedSvgToSharp(logoOrigPath, {
    width: size,
  })

  logoSharp
    .png({ compressionLevel: 9 })
    .toFile(path.join(dir, iconNames.logoPng.replace('%s', size.toString())))
    .catch(function (e) {
      console.log(e)
    })
})

/**
 * manifest.json
 */

const icons: any = faviconSvgToPngSizes
  .map((i) => {
    const str = i.toString()
    return {
      src: iconNames.faviconPng.replace('%s', str),
      sizes: `${str}x${str}`,
      type: 'image/png',
    }
  })
  .concat(
    logoSvgToPngSizes.map((i) => {
      const str = i.toString()
      return {
        src: iconNames.logoPng.replace('%s', str),
        sizes: `${str}x${str}`,
        type: 'image/png',
      }
    }),
  )

icons.push({
  src: iconNames.logoSvg,
  sizes: '513x513',
  type: 'image/svg+xml',
})

icons.push({
  src: iconNames.faviconMaskableSvg,
  sizes: faviconMaskableSvgSizes.map((n) => `${n}x${n}`).join(' '),
  type: 'image/svg+xml',
  purpose: 'maskable',
})

icons.push({
  src: iconNames.logoMaskableSvg,
  sizes: logoMaskableSvgSizes.map((n) => `${n}x${n}`).join(' '),
  type: 'image/svg+xml',
  purpose: 'maskable',
})

const resultJson = JSON.stringify({ ...rest, icons }, null, 2)
fs.writeFileSync(path.join(dir, 'manifest.json'), resultJson)
