import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import explosion from '../../assets/img/explosion.png'

const useStyles = createUseStyles({
  '@keyframes explosion': {
    '100%': {
      'background-position': '-3840px',
    },
  },

  main: {
    position: 'absolute',
    top: '40%',
    left: '10%',
    width: '192px',
    height: '192px',
    'background-image': `url(${explosion})`,
    'background-repeat': 'no-repeat',
    'animation-name': '$explosion',
    'animation-duration': '1s',
    'animation-timing-function': 'steps(20)',
    'animation-iteration-count': 'infinite',
  },
})

const Explosion = () => {
  const classes = useStyles()
  return <div className={cx('z-50 pointer-events-none', classes.main)}></div>
}

export default Explosion
