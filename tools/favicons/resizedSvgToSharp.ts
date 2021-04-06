import sharp from 'sharp'

const resizedSvgToSharp = async (
  p: string | Buffer,
  { width, height }: { width?: number; height?: number },
) => {
  const instance = sharp(p)

  const metadata = await instance.metadata()

  const initDensity = metadata.density ?? 72

  if (metadata.format !== 'svg') {
    return instance
  }

  let wDensity = 0
  let hDensity = 0
  if (width && metadata.width) {
    wDensity = (initDensity * width) / metadata.width
  }

  if (height && metadata.height) {
    hDensity = (initDensity * height) / metadata.height
  }

  if (!wDensity && !hDensity) {
    // both width & height are not present and/or
    // can't detect both metadata.width & metadata.height
    return instance
  }

  return sharp(p, { density: Math.max(wDensity, hDensity) }).resize(
    width,
    height,
  )
}

export default resizedSvgToSharp
