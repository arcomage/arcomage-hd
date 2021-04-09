import React, { memo, useContext, useEffect, useState } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'

import winImg from '../../../assets/img/end_win.svg'
import loseImg from '../../../assets/img/end_lose.svg'
import tieImg from '../../../assets/img/end_tie.svg'
import firework from '../../../assets/img/firework.png'
import { I18nContext } from '../../i18n/I18nContext'
import { useAppDispatch } from '../../utils/useAppDispatch'
import { INIT, SCREEN_END } from '../../constants/ActionTypes'
import useKeyDown from '../../utils/useKeyDown'
import { endScreenExitableDelay } from '../../constants/visuals'
import { EndScreenNoCloseStateType } from '../../types/state'

const textMap = { lose: 'You Lose!', tie: 'Tie Game', win: 'You Win!' }
const erathianTextMap = { lose: 'you lose', tie: 'tie game', win: 'you win' }
const imgMap = { lose: loseImg, tie: tieImg, win: winImg }
const animMap = { lose: 'blackNeon', tie: 'redNeon', win: 'redNeon' }

const useStyles = createUseStyles<string, EndScreenNoCloseStateType>({
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
    'background-image': ({ type }) => `url(${imgMap[type]})`,
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

  notetext: {
    top: '62%',
    height: '5em',
    'font-size': '5vh',
    'line-height': '5vh',
  },

  text: {
    'font-size': '15vh',
    'line-height': '15vh',
    bottom: '53%',
    animation: ({ type }) =>
      `$${animMap[type]} 0.08s ease-in-out infinite alternate`,
  },

  erathiantext: {
    'font-size': '6.8vh',
    'line-height': '6.8vh',
    bottom: '42%',
    'text-shadow':
      '0 0 10px rgba(125,203,255,0.98), 0 0 30px rgba(125,203,255,0.82), 0 0 12px rgba(0,129,255,0.88), 0 0 22px rgba(0,129,255,0.84), 0 0 38px rgba(0,129,255,0.88), 0 0 60px rgba(0,129,255,1)',
  },

  erathiantextspace: {
    display: 'inline-block',
    width: '4em',
  },
})

const EndScreen = (endScreenState: EndScreenNoCloseStateType) => {
  const dispatch = useAppDispatch()
  const _ = useContext(I18nContext)
  const classes = useStyles(endScreenState)

  const { type, surrender } = endScreenState

  const text = _.i18n(textMap[type])

  const erathianTextArr = erathianTextMap[type].split(' ')

  const erathianTextContainer = (
    <>
      {erathianTextArr[0]}
      <span className={classes.erathiantextspace}></span>
      {erathianTextArr[1]}
    </>
  )

  let noteText: string | null = null
  if (surrender) {
    switch (type) {
      case 'win':
        noteText = _.i18n(
          'With no usable or discardable card, your opponent has surrendered',
        )
        break
      case 'lose':
        noteText = _.i18n(
          'With no usable or discardable card, you have surrendered',
        )
        break
    }
  }

  const [exitable, setExitable] = useState(false)
  useEffect(() => {
    setExitable(false)
    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      setExitable(true)
    }, endScreenExitableDelay)

    return () => {
      clearTimeout(timer)
    }
  }, [endScreenState])

  const onActionFunc = () => {
    dispatch({
      type: SCREEN_END,
      payload: { type: null },
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
        {noteText !== null && (
          <div
            className={cx(
              classes.notetext,
              'absolute w-full font-bold text-white text-center robotocondensed text-shadow-stroke',
            )}
          >
            {noteText}
          </div>
        )}
        <div
          className={cx(
            classes.text,
            'absolute w-full font-bold text-white text-center robotocondensed',
          )}
        >
          {text}
        </div>
        <div
          className={cx(
            classes.erathiantext,
            'absolute w-full tracking-tighter text-white text-center erathian-normal',
          )}
        >
          {erathianTextContainer}
        </div>
        {(type === 'win' || type === 'tie') && (
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
