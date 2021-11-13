import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { numberDiffDuration } from '../../constants/visuals'

const useStyles = createUseStyles({
  '@keyframes fadeOutUp': {
    from: {
      transform: 'translateY(0)',
      opacity: 1,
    },

    to: {
      transform: 'translateY(-2.5em)',
      opacity: 0,
    },
  },
  main: {
    top: '-0.5em',
    left: '0.4em',
    opacity: 0,
    '@media screen and (prefers-reduced-motion: no-preference)': {
      'will-change': 'transform, opacity',
      'animation-name': '$fadeOutUp',
      'animation-duration': `${numberDiffDuration}ms`,
      'animation-timing-function': 'ease-out',
    },
  },
})

type PropType = { n: number }

const NumberDiff = ({ n }: PropType) => {
  const classes = useStyles()
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const main = useRef<HTMLDivElement | null>(null)

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
        divEl.className = cx(
          classes.main,
          'absolute font-mono text-2xl text-shadow-md',
          `text-${diff >= 0 ? 'green' : 'red'}-500`,
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

  // Force TailwindCSS to aware of these classes:
  // text-green-500
  // text-red-500

  return <div ref={main} className="z-50 absolute w-full h-full"></div>
}

export default NumberDiff
