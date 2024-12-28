import React, { useState, useEffect, useRef } from 'react'
import { animatedNumberDuration } from '../../constants/visuals'
import { useAppSelector } from '../../utils/useAppDispatch'

type PropType = { n: number }

const AnimatedNumber = ({ n }: PropType) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const timer = useRef<NodeJS.Timeout | null>(null)

  const noanim: boolean = useAppSelector((state) => state.visual.noanim)

  const [nv, setNv] = useState(n)

  useEffect(() => {
    if (noanim) {
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
        // browser will be forced to use 4 if timeout < 4
        // meaning if it increases from 0 to 1000, it'll look slower than animatedNumberDuration
        timer.current = setInterval(() => {
          setNv((nv0) => {
            const ret = nv0 + (n > prev ? 1 : -1)
            if (ret === n && timer.current !== null) {
              clearInterval(timer.current)
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
