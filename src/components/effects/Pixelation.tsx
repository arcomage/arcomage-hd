import React, { memo, useEffect, useRef } from 'react'
import { contain, cover } from '../../utils/canvasImageFit'

type PropType = {
  src: string
  level: number
  fit?: 'contain' | 'cover'
  offsetX?: number
  offsetY?: number
  width?: string
  height?: string
  cleanup?: boolean
}

type CanvasRenderingContext2DCompatible = CanvasRenderingContext2D & {
  webkitImageSmoothingEnabled: boolean
  mozImageSmoothingEnabled: boolean
  msImageSmoothingEnabled: boolean
}

const Pixelation = ({
  src,
  level,
  fit,
  offsetX = 0.5,
  offsetY = 0.5,
  width,
  height,
  cleanup = false,
}: PropType) => {
  const main = useRef<HTMLCanvasElement | null>(null)

  const rdr = () => {
    setTimeout(() => {
      const canvas = main.current

      if (canvas !== null) {
        canvas.style.width = width ?? '100%'
        canvas.style.height = height ?? '100%'
        canvas.width = canvas.offsetWidth
        canvas.height = canvas.offsetHeight

        canvas.style.cssText =
          'image-rendering: optimizeSpeed;' + // FireFox < 6.0
          'image-rendering: -moz-crisp-edges;' + // FireFox
          'image-rendering: -o-crisp-edges;' + // Opera
          'image-rendering: -webkit-crisp-edges;' + // Chrome
          'image-rendering: crisp-edges;' + // Chrome
          'image-rendering: -webkit-optimize-contrast;' + // Safari
          'image-rendering: pixelated; ' // + // modern browsers
        // '-ms-interpolation-mode: nearest-neighbor;' + // IE

        const context = canvas.getContext('2d')

        if (context !== null) {
          ;(
            context as CanvasRenderingContext2DCompatible
          ).webkitImageSmoothingEnabled = false
          ;(
            context as CanvasRenderingContext2DCompatible
          ).mozImageSmoothingEnabled = false
          // ;(
          //   context as CanvasRenderingContext2DCompatible
          // ).msImageSmoothingEnabled = false
          context.imageSmoothingEnabled = false

          const percent = 1 / level

          const scaledWidth = canvas.width * percent
          const scaledHeight = canvas.height * percent
          const image = new Image()
          image.src = src
          image.addEventListener('load', () => {
            if (fit) {
              const {
                offsetX: offsetX2,
                offsetY: offsetY2,
                width: width2,
                height: height2,
              } = {
                contain,
                cover,
              }[fit](
                scaledWidth,
                scaledHeight,
                image.width,
                image.height,
                1,
                offsetX,
                offsetY,
              )

              context.drawImage(image, offsetX2, offsetY2, width2, height2)
            } else {
              context.drawImage(image, 0, 0, scaledWidth, scaledHeight)
            }

            context.drawImage(
              canvas,
              0,
              0,
              scaledWidth,
              scaledHeight,
              0,
              0,
              canvas.width,
              canvas.height,
            )
            if (cleanup) {
              context.clearRect(0, 0, scaledWidth, scaledHeight)
            }
          })
        }
      }
    }, 0)
  }

  useEffect(() => {
    window.addEventListener('resize', rdr)
    window.addEventListener('orientationchange', rdr)
    rdr()

    return () => {
      window.removeEventListener('resize', rdr)
      window.removeEventListener('orientationchange', rdr)
    }
  }, [])

  useEffect(() => {
    rdr()
  })

  return <canvas ref={main} />
}

export default memo(Pixelation)
