import path from 'path'
import fs from 'fs'
import manifestTmpl from '../../assets/logo/manifest.template'
import resizedSvgToSharp from './resizedSvgToSharp'

/**
 * Generate manifest.json and icons
 * @returns manifest.json as object
 * @note Currently vite.config.ts uses this. No need to call this function/execute this script file manually
 */
const genManifestAndIcons = () => {
  const copy = (fileName: string, srcDir: string, destDir: string) => {
    fs.copyFile(
      path.join(srcDir, fileName),
      path.join(destDir, fileName),
      (err) => {
        if (err) {
          console.error(`Error copying file ${fileName}:`, err)
        } else {
          console.log(`File ${fileName} copied`)
        }
      },
    )
  }

  const ogimageDir = path.join(__dirname, '../../assets/logo')
  const ogimage = 'ogimage.jpg'

  const {
    faviconSvgToPngSizes,
    logoSvgToPngSizes,
    faviconMaskableSvgSizes,
    logoMaskableSvgSizes,
    iconNames,
    ...rest
  } = manifestTmpl

  const dir = path.join(__dirname, '../../assets/logo/')
  const outDir = path.join(__dirname, '../../public/')
  const faviconOrigPath = path.join(dir, iconNames.faviconSvg)
  const logoOrigPath = path.join(dir, iconNames.logoSvg)

  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true })
    console.log('Directory created:', outDir)
  }

  /**
   * favicon generation
   */
  faviconSvgToPngSizes.forEach(async (size) => {
    const faviconSharp = await resizedSvgToSharp(faviconOrigPath, {
      width: size,
    })

    const fileName = iconNames.faviconPng.replace('%s', size.toString())

    faviconSharp
      .png({ compressionLevel: 9 })
      .toFile(path.join(outDir, fileName))
      .then(function () {
        console.log(`File ${fileName} saved`)
      })
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

    const fileName = iconNames.logoPng.replace('%s', size.toString())

    logoSharp
      .png({ compressionLevel: 9 })
      .toFile(path.join(outDir, fileName))
      .then(function () {
        console.log(`File ${fileName} saved`)
      })
      .catch(function (e) {
        console.log(e)
      })
  })

  /**
   * manifest.json
   */
  const icons: {
    src: string
    sizes: string
    type: string
    purpose?: string
  }[] = faviconSvgToPngSizes
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

  const result = { ...rest, icons }
  // const resultJson = JSON.stringify({ ...rest, icons }, null, 2)
  // try {
  //   fs.writeFileSync(path.join(outDir, 'manifest.json'), resultJson)
  //   console.log(`File manifest.json saved`)
  // } catch (error) {
  //   console.log(error)
  // }

  copy('favicon_logo_maskable.svg', dir, outDir)
  copy('favicon_logo.svg', dir, outDir)
  copy('favicon_maskable.svg', dir, outDir)
  copy('favicon.ico', dir, outDir)
  copy('favicon.svg', dir, outDir)
  copy('logo.svg', dir, outDir)

  copy(ogimage, ogimageDir, outDir)

  return result
}

export default genManifestAndIcons
