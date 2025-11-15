import React, { useEffect, useRef } from 'react'
import {
  animatedNumberDuration,
  minAnimatedNumberInterval,
} from '@/constants/visuals'
import { useAppSelector } from '@/utils/hooks/useAppDispatch'

type PropType = { n: number }

/**
 * Number quickly changes from n to n+1 to n+2 ... until the final value
 */
const AnimatedNumber = ({ n }: PropType) => {
  const noanim = useAppSelector((state) => state.visual.noanim)
  const numberRef = useRef<HTMLSpanElement>(null)
  const prevNRef = useRef(n)
  const animationFrameRef = useRef<number>(null)
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

    let step = n > prev ? 1 : -1
    const diffNumber = Math.abs(n - prev)
    let intervalTime = animatedNumberDuration / diffNumber
    if (intervalTime < minAnimatedNumberInterval) {
      step = step * Math.ceil(minAnimatedNumberInterval / intervalTime)
      intervalTime = minAnimatedNumberInterval
    }
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
        if (
          step !== 1 &&
          step !== -1 &&
          (n > prev ? currentValue + step > n : currentValue + step < n)
        ) {
          currentValue = n
          displayValueRef.current = currentValue
          numberRef.current.textContent = String(currentValue)
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
  }, [n, noanim])

  // no lint reason: intentionally use ref and imperative actions for optimization
  return <span ref={numberRef}>{displayValueRef.current}</span>
}

export default AnimatedNumber
