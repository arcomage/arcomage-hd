import React, { useState, useEffect, useRef } from 'react'
import { animatedNumberDuration } from '../../constants/visuals'

type PropType = { n: number }

const AnimatedNumber = ({ n }: PropType) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const [nv, setNv] = useState(n)

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      if (prev !== nv) {
        if (timer.current !== null) {
          clearInterval(timer.current)
        }
        setNv(prev)
      }
      timer.current = setInterval(() => {
        setNv((nv) => {
          const ret = nv + (n > prev ? 1 : -1)
          if (ret === n) {
            if (timer.current !== null) {
              clearInterval(timer.current)
            }
          }
          return ret
        })
      }, (animatedNumberDuration) / Math.abs(n - prev))
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n])

  return <>{nv}</>
}

export default AnimatedNumber
