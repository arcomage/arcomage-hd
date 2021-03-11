import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

const duration = 1.2

const useStyles = createUseStyles({
  '@keyframes fadeOutUp': {
    from: {
      transform: 'translate3d(0, 0, 0)',
      opacity: 1,
    },

    to: {
      transform: 'translate3d(0, -2.5em, 0)',
      opacity: 0,
    },
  },
  main: {
    top: '-0.5em',
    left: '0.4em',
    opacity: 0,
    'animation-name': '$fadeOutUp',
    'animation-duration': `${duration}s`,
    'animation-timing-function': 'ease-out',
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
          `absolute font-mono text-2xl text-${
            diff >= 0 ? 'green-500' : 'red-700'
          } text-shadow-md`,
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
  // text-red-700

  return <div ref={main} className="z-50 absolute w-full h-full"></div>
}

export default NumberDiff
