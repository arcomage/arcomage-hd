import React, { memo, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import youWinImg from '../../../assets/img/you-win.svg'
import youLoseImg from '../../../assets/img/you-lose.svg'
import firework from '../../../assets/img/firework.png'
import { I18nContext } from '../../i18n/I18nContext'
import { useAppDispatch } from '../../utils/useAppDispatch'
import { INIT, SCREEN_END } from '../../constants/ActionTypes'
import useKeyDown from '../../utils/useKeyDown'
import { endScreenExitableDelay } from '../../constants/transition'

const textArr = ['You Lose!', 'Tie Game', 'You Win!']

const useStyles = createUseStyles<string, 1 | 0 | -1>({
  '@keyframes fadein': {
    '0%': {
      opacity: 0,
    },
    '100%': {
      opacity: 1,
    },
  },
  container: {
    padding: '15vh 10%',
    opacity: 1,
    'animation-name': '$fadein',
    'animation-iteration-count': 1,
    'animation-timing-function': 'ease-in',
    'animation-duration': '0.4s',
  },
  main: {
    'background-image': (kind) => `url(${kind >= 0 ? youWinImg : youLoseImg})`,
  },
  '@keyframes firework': {
    '100%': {
      'background-position': '-7936px',
    },
  },
  firework: {
    width: '256px',
    height: '256px',
    'background-image': `url(${firework})`,
    'background-repeat': 'no-repeat',
    'animation-name': '$firework',
    'animation-timing-function': 'steps(31)',
    'animation-duration': '1s',
    'animation-iteration-count': 1,
    'animation-delay': '0.5s',
  },
  firework2: {
    'animation-delay': '1.6s',
  },

  '@keyframes redNeon': {
    from: {
      'text-shadow': `0 0 6px rgba(225,191,191,0.92), 0 0 30px rgba(225,191,191,0.54), 0 0 12px rgba(238,54,37,0.72), 0 0 21px rgba(238,54,37,0.92), 0 0 34px rgba(238,54,37,0.78), 0 0 54px rgba(238,54,37,0.92)`,
    },
    to: {
      'text-shadow': `0 0 6px rgba(225,191,191,0.98), 0 0 30px rgba(225,191,191,0.62), 0 0 12px rgba(238,54,37,0.78), 0 0 22px rgba(238,54,37,0.84), 0 0 38px rgba(238,54,37,0.88), 0 0 60px rgba(238,54,37,1)`,
    },
  },

  '@keyframes blackNeon': {
    from: {
      'text-shadow': `0 0 6px rgba(0,0,0,0.92), 0 0 30px rgba(0,0,0,0.54), 0 0 12px rgba(0,0,0,0.72), 0 0 21px rgba(0,0,0,0.92), 0 0 34px rgba(0,0,0,0.78), 0 0 54px rgba(0,0,0,0.92)`,
    },
    to: {
      'text-shadow': `0 0 6px rgba(0,0,0,0.98), 0 0 30px rgba(0,0,0,0.62), 0 0 12px rgba(0,0,0,0.78), 0 0 22px rgba(0,0,0,0.84), 0 0 38px rgba(0,0,0,0.88), 0 0 60px rgba(0,0,0,1)`,
    },
  },

  text: {
    'font-size': '15vh',
    'line-height': '15vh',
    bottom: '53%',
    color: '#fff',
    animation: (kind) =>
      `${
        kind >= 0 ? '$redNeon' : '$blackNeon'
      } 0.08s ease-in-out infinite alternate`,
  },
})

type PropType = { kind: 1 | 0 | -1 }
const EndScreen = ({ kind }: PropType) => {
  const dispatch = useAppDispatch()
  const _ = useContext(I18nContext)
  const classes = useStyles(kind)

  const text = _.i18n(textArr[kind + 1])

  const [exitable, setExitable] = useState(false)
  useEffect(() => {
    setTimeout(() => {
      setExitable(true)
    }, endScreenExitableDelay)
  }, [])

  const onActionFunc = () => {
    dispatch({
      type: SCREEN_END,
      kind: null,
    })
    dispatch({
      type: INIT,
    })
  }

  useKeyDown(null, onActionFunc, endScreenExitableDelay)

  const clickObj = exitable
    ? { onClick: onActionFunc, onContextMenu: onActionFunc, tabIndex: 0 }
    : {}

  return (
    <div
      className={cx(
        'absolute w-full h-full top-0 left-0 z-90 bg-black bg-opacity-50',
        classes.container,
      )}
      {...clickObj}
    >
      <div
        className={cx(
          'w-full h-full bg-center bg-no-repeat bg-contain relative',
          classes.main,
        )}
      >
        <div
          className={cx(
            classes.text,
            'absolute w-full font-bold text-white text-center robotocondensed',
          )}
        >
          {text}
        </div>
        {kind >= 0 && (
          // win OR tie
          <>
            <div
              className={cx(classes.firework, 'absolute top-0 left-1/4')}
            ></div>
            <div
              className={cx(
                classes.firework,
                classes.firework2,
                'absolute bottom-0 right-1/4',
              )}
            ></div>
          </>
        )}
      </div>
    </div>
  )
}

export default memo(EndScreen)
