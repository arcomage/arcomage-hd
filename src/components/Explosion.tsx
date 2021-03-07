import React from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import explosion from '../../assets/img/explosion.png'

const useStyles = createUseStyles({
  '@keyframes explosion': {
    '100%': {
      'background-position': '-4032px',
    },
  },

  main: {
    width: '192px',
    height: '192px',
    'background-image': `url(${explosion})`,
    'background-repeat': 'no-repeat',
    'animation-name': '$explosion',
    'animation-duration': '1s',
    'animation-timing-function': 'steps(21)',
    'animation-iteration-count': 1,
  },
})

const Explosion = ({ ongoing }: { ongoing: boolean }) => {
  const classes = useStyles()
  return (
    <>
      {ongoing && (
        <div className="z-40 pointer-events-none w-full h-full absolute top-0 left-1/2">
          <div
            className={cx(
              'transform -translate-x-1/2 -translate-y-1/2',
              classes.main,
            )}
          ></div>
        </div>
      )}
    </>
  )
}

export default Explosion
