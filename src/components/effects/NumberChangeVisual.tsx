import cl from 'clarr'
import React, { useContext, useEffect, useRef } from 'react'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import styles from './NumberChangeVisual.module.scss'

type PropType = { n: number }

/**
 * Explosion / firework effect when the number changes
 */
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
        divEl.className = cl(
          styles.inner,
          size.narrowMobile ? 'scale-50' : 'scale-75',
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

  return <div ref={main} className={styles.main}></div>
}

export default NumberChangeVisual
