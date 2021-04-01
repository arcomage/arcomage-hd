import React, { useEffect, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import explosion from '../../../assets/img/explosion.png'
import firework from '../../../assets/img/firework.png'

const useStyles = createUseStyles({
  '@keyframes explosion': {
    '100%': {
      'background-position': '-4032px',
    },
  },

  '@keyframes firework': {
    '100%': {
      'background-position': '-7936px',
    },
  },

  main: {
    'will-change': 'background-position',
    'background-repeat': 'no-repeat',
    'animation-duration': '1s',
    'animation-iteration-count': 1,
  },

  explosion: {
    width: '192px',
    height: '192px',
    top: 0,
    left: 0,
    'background-image': `url(${explosion})`,
    'animation-name': '$explosion',
    'animation-timing-function': 'steps(21)',
  },

  firework: {
    width: '256px',
    height: '256px',
    top: '-300%',
    left: '1rem',
    'background-image': `url(${firework})`,
    'animation-name': '$firework',
    'animation-timing-function': 'steps(31)',
  },
})

type PropType = { n: number }

const NumberChangeVisual = ({ n }: PropType) => {
  const classes = useStyles()
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const main = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      const mainEl = main.current
      if (mainEl !== null) {
        const divEl = document.createElement('div')
        divEl.className = cx(
          'transform -translate-x-1/2 -translate-y-1/2 absolute',
          classes.main,
          n < prev ? classes.explosion : classes.firework,
        )
        mainEl.appendChild(divEl)
        divEl.onanimationend = () => mainEl.removeChild(divEl)
      }
    }
    if (!hasMounted.current) {
      hasMounted.current = true
    }
    prevNRef.current = n
  }, [n])

  return (
    <div
      ref={main}
      className="z-40 pointer-events-none w-full h-full absolute top-0 left-1/2"
    ></div>
  )
}

export default NumberChangeVisual
