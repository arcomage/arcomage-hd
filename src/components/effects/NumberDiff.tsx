import React, { useEffect, useRef } from 'react'
import cl from '@/utils/clarr'
import styles from './NumberDiff.module.scss'

type PropType = { n: number }

/**
 * Green "+n" / red "-n" text that shows up when the number changes but quickly disappears
 */
const NumberDiff = ({ n }: PropType) => {
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const main = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      const mainEl = main.current
      if (mainEl !== null) {
        const diff = n - prev
        const divEl = document.createElement('div')
        const textNode = document.createTextNode(
          `${diff > 0 ? '+' : ''}${diff.toString()}`,
        )
        divEl.className = cl(
          styles.number,
          diff >= 0 ? styles.up : styles.down,
          'el-number',
        )
        divEl.appendChild(textNode)
        mainEl.appendChild(divEl)
        divEl.onanimationend = () => mainEl.removeChild(divEl)
      }
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n])

  return <div ref={main} className={styles.main} aria-hidden={true}></div>
}

export default NumberDiff
