import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../../utils/useAppDispatch'

import { SCREEN_HELP } from '../../constants/ActionTypes'
import { I18nContext } from '../../i18n/I18nContext'
import TooltipAll from '../special/TooltipAll'

const useStyles = createUseStyles<string>({
  '@keyframes rotate2': {
    '0%, 100%': {
      transform: 'rotate(0deg)',
    },
    '25%': {
      transform: 'rotate(30deg)',
    },
    '75%': {
      transform: 'rotate(-30deg)',
    },
  },
  helpButton: {
    left: 'calc(60% + 12rem)',
    '@media screen and (prefers-reduced-motion: no-preference)': {
      '&:hover, &.windowactive': {
        '& svg': {
          animation: '$rotate2 2s linear infinite',
        },
      },
    },
  },
})

const ButtonHelp = () => {
  const _ = useContext(I18nContext)

  const help = useAppSelector((state) => state.screen.help)

  const dispatch = useAppDispatch()

  const classes = useStyles()

  return (
    <TooltipAll title={_.i18n('Help')}>
      <button
        accessKey="h"
        className={cx('topbutton', classes.helpButton, { windowactive: help })}
        onClick={() => {
          dispatch({
            type: SCREEN_HELP,
            show: true,
          })
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12,2.1c-5.5,0-9.9,4.4-9.9,9.9c0,5.5,4.4,9.9,9.9,9.9c5.5,0,9.9-4.4,9.9-9.9C21.9,6.5,17.5,2.1,12,2.1z M12,20.1c-4.5,0-8.1-3.6-8.1-8.1c0-4.5,3.6-8.1,8.1-8.1c4.5,0,8.1,3.6,8.1,8.1C20.1,16.5,16.5,20.1,12,20.1z" />
          <path d="M11.8,6.7c-2.5,0-3.2,2.2-3.2,2.2L10,9.7c0,0,0.3-0.8,0.9-1.2c0.5-0.4,1.6-0.6,2.2,0.1c0.7,0.9-0.2,1.6-1.1,2.7 c-1,1.2-1,3.7-1,3.7h2c0,0,0.1-2.3,1-3.4c0.6-0.7,1.4-1.3,1.4-2.5S14.3,6.7,11.8,6.7z" />
          <rect x="11" y="16" width="2" height="2" />
        </svg>
      </button>
    </TooltipAll>
  )
}

export default memo(ButtonHelp)
