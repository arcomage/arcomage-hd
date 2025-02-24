import React, { useContext, useEffect, useRef } from 'react'
import cx from 'clsx'

import { GameSizeContext } from '../../utils/contexts/GameSizeContext'

import styles from './NumberChangeVisual.module.scss'

type PropType = { n: number }

const NumberChangeVisual = ({ n }: PropType) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const main = useRef<HTMLDivElement>(null)
  const size = useContext(GameSizeContext)

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      const mainEl = main.current
      if (mainEl !== null) {
        const divEl = document.createElement('div')
        divEl.className = cx(
          '-translate-x-1/2 -translate-y-1/2 transform-gpu absolute',
          size.narrowMobile ? 'scale-50' : 'scale-75',
          styles.main,
          n < prev ? styles.explosion : styles.firework,
        )
        mainEl.appendChild(divEl)
        divEl.onanimationend = () => mainEl.removeChild(divEl)
      }
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n, size.narrowMobile])

  return (
    <div
      ref={main}
      className="z-40 pointer-events-none w-full h-full absolute top-0 left-1/2"
    ></div>
  )
}

export default NumberChangeVisual
