import React, { useState, useEffect, useRef } from 'react'

const AnimatedNumber = ({ n }: { n: number }) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const [nv, setNv] = useState(n)

  const duration = 0.2

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      const timer = setInterval(() => {
        setNv((nv) => {
          const ret = nv + (n > prev ? 1 : -1)
          if (ret === n) {
            clearInterval(timer)
          }
          return ret
        })
      }, (duration * 1000) / Math.abs(n - prev))
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n])

  return <>{nv}</>
}

export default AnimatedNumber
