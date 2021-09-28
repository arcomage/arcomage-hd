import React, { useState, useEffect, useRef } from 'react'
import { animatedNumberDuration } from '../../constants/visuals'

type PropType = { n: number }

const AnimatedNumber = ({ n }: PropType) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const [nv, setNv] = useState(n)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setNv(n)
    } else {
      if (hasMounted.current) {
        const prev = prevNRef.current
        if (prev !== nv) {
          if (timer.current !== null) {
            clearInterval(timer.current)
          }
          setNv(prev)
        }
        // https://html.spec.whatwg.org/multipage/timers-and-user-prompts.html#timers
        // browser will force to use 4 if timeout < 4
        // meaning if it increases from 0 to 1000, it'll look slower than animatedNumberDuration
        // but for now I just leave it alone
        timer.current = setInterval(() => {
          setNv((nv0) => {
            const ret = nv0 + (n > prev ? 1 : -1)
            if (ret === n) {
              if (timer.current !== null) {
                clearInterval(timer.current)
              }
            }
            return ret
          })
        }, animatedNumberDuration / Math.abs(n - prev))
      }
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n])

  return <>{nv}</>
}

export default AnimatedNumber
