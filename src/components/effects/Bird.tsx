import React, { memo } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import bird from '../../../assets/img/bird.svg'

const useStyles = createUseStyles({
  '@keyframes fly-cycle': {
    '100%': {
      'background-position': '-900px',
    },
  },

  '@keyframes fly-right-one': {
    '0%': {
      transform: 'scale(0.3) translateX(-10vw)',
    },

    '10%': {
      transform: 'translateY(2vh) translateX(10vw) scale(0.4)',
    },

    '20%': {
      transform: 'translateY(0vh) translateX(30vw) scale(0.5)',
    },

    '30%': {
      transform: 'translateY(4vh) translateX(50vw) scale(0.6)',
    },

    '40%': {
      transform: 'translateY(2vh) translateX(70vw) scale(0.6)',
    },

    '50%': {
      transform: 'translateY(0vh) translateX(90vw) scale(0.6)',
    },

    '60%': {
      transform: 'translateY(0vh) translateX(110vw) scale(0.6)',
    },

    '100%': {
      transform: 'translateY(0vh) translateX(110vw) scale(0.6)',
    },
  },

  birdcontainer: {
    position: 'absolute',
    top: '32%',
    left: '-10%',
    transform: 'scale(0) translateX(-10vw)',
    'will-change': 'transform',
    'animation-name': '$fly-right-one',
    'animation-timing-function': 'linear',
    'animation-iteration-count': 'infinite',
  },

  birdcontainer1: {
    'animation-duration': '15s',
    'animation-delay': '0',
  },

  birdcontainer2: {
    'animation-duration': '15.5s',
    'animation-delay': '1s',
  },

  bird: {
    'background-image': `url(${bird})`,
    'background-size': 'auto 100%',
    width: '44px',
    height: '62.5px',
    'will-change': 'background-position',

    'animation-name': '$fly-cycle',
    'animation-timing-function': 'steps(10)',
    'animation-iteration-count': 'infinite',
  },

  bird1: {
    'animation-duration': '1s',
    'animation-delay': '-0.5s',
  },

  bird2: {
    'animation-duration': '0.9s',
    'animation-delay': '-0.75s',
  },
})

const Bird = () => {
  const classes = useStyles()
  return (
    <>
      <div
        className={cx('z-10', classes.birdcontainer, classes.birdcontainer1)}
      >
        <div className={cx(classes.bird, classes.bird1)}></div>
      </div>

      <div
        className={cx('z-10', classes.birdcontainer, classes.birdcontainer2)}
      >
        <div className={cx(classes.bird, classes.bird2)}></div>
      </div>
    </>
  )
}

export default memo(Bird)
