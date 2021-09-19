import React, { memo, useEffect, useRef } from 'react'
import { contain, cover } from '../../utils/canvasImageFit'

type PropType = {
  src: string
  level: number
  fit?: 'contain' | 'cover'
  offsetX?: number
  offsetY?: number
}

type CanvasRenderingContext2DCompatible = CanvasRenderingContext2D & {
  webkitImageSmoothingEnabled: boolean
  mozImageSmoothingEnabled: boolean
  msImageSmoothingEnabled: boolean
}

const Pixelated = ({
  src,
  level,
  fit,
  offsetX = 0.5,
  offsetY = 0.5,
}: PropType) => {
  const main = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const render = () => {
      setTimeout(() => {
        const canvas = main.current

        if (canvas !== null) {
          canvas.style.width = '100%'
          canvas.style.height = '100%'
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
            })
          }
        }
      }, 0)
    }

    window.addEventListener('resize', render)
    window.addEventListener('orientationchange', render)
    render()

    return () => {
      window.removeEventListener('resize', render)
      window.removeEventListener('orientationchange', render)
    }
  }, [src, level, fit, offsetX, offsetY])

  return <canvas ref={main} />
}

export default memo(Pixelated)
