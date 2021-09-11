import React, { useContext, useEffect, useRef } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import explosion from '../../../assets/img/explosion.webp'
import firework from '../../../assets/img/firework.webp'
import { GameSizeContext } from '../../utils/GameSizeContext'
import { numberChangeVisualDuration } from '../../constants/visuals'

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
    'background-repeat': 'no-repeat',
    '@media screen and (prefers-reduced-motion: no-preference)': {
      'will-change': 'background-position',
      'animation-duration': `${numberChangeVisualDuration}ms`,
      'animation-iteration-count': 1,
    },
  },

  explosion: {
    width: '192px',
    height: '192px',
    top: 0,
    left: 0,
    'background-image': `url(${explosion})`,
    '@media screen and (prefers-reduced-motion: no-preference)': {
      'animation-name': '$explosion',
      'animation-timing-function': 'steps(21)',
    },
  },

  firework: {
    width: '256px',
    height: '256px',
    top: '-300%',
    left: '1rem',
    'background-image': `url(${firework})`,
    '@media screen and (prefers-reduced-motion: no-preference)': {
      'animation-name': '$firework',
      'animation-timing-function': 'steps(31)',
    },
  },
})

type PropType = { n: number }

const NumberChangeVisual = ({ n }: PropType) => {
  const classes = useStyles()
  const hasMounted = useRef(false)
  const prevNRef = useRef(0)
  const main = useRef<HTMLDivElement | null>(null)
  const size = useContext(GameSizeContext)

  useEffect(() => {
    if (hasMounted.current) {
      const prev = prevNRef.current
      const mainEl = main.current
      if (mainEl !== null) {
        const divEl = document.createElement('div')
        divEl.className = cx(
          'transform -translate-x-1/2 -translate-y-1/2 absolute',
          size.narrowMobile ? 'scale-50' : 'scale-75',
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
