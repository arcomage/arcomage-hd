import React, { memo, useEffect, useRef } from 'react'
import { animatedNumberDuration } from '../../constants/visuals'
import { useAppSelector } from '../../utils/hooks/useAppDispatch'

type PropType = { n: number }

const AnimatedNumber = ({ n }: PropType) => {
  const noanim = useAppSelector((state) => state.visual.noanim)
  const numberRef = useRef<HTMLSpanElement | null>(null)
  const prevNRef = useRef(n)
  const animationFrameRef = useRef<number | null>(null)
  const displayValueRef = useRef(n)

  useEffect(() => {
    if (!numberRef.current) {
      return
    }

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current)
    }

    if (noanim) {
      displayValueRef.current = n
      numberRef.current.textContent = String(n)
      prevNRef.current = n
      return
    }

    const prev = prevNRef.current
    if (prev === n) {
      return
    }

    const step = n > prev ? 1 : -1
    const totalSteps = Math.abs(n - prev)
    const intervalTime = animatedNumberDuration / totalSteps
    let currentValue = prev
    let lastTime = performance.now()

    const updateNumber = (time: number) => {
      if (!numberRef.current) {
        return
      }

      const deltaTime = time - lastTime
      if (deltaTime >= intervalTime) {
        lastTime = time
        currentValue += step
        displayValueRef.current = currentValue
        numberRef.current.textContent = String(currentValue)

        if (currentValue === n) {
          animationFrameRef.current = null
          return
        }
      }

      animationFrameRef.current = requestAnimationFrame(updateNumber)
    }

    animationFrameRef.current = requestAnimationFrame(updateNumber)
    prevNRef.current = n

    return () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [n]) // intentionally not including `noanim` in dependencies

  return <span ref={numberRef}>{displayValueRef.current}</span>
}

export default memo(AnimatedNumber)
