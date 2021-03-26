import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'

import iconPref from '../../assets/img/pref.svg'
import iconLangPref from '../../assets/img/lang.svg'
import iconVolumePref from '../../assets/img/volume.svg'
import iconHelp from '../../assets/img/help.svg'
import {
  SCREEN_HELP,
  SCREEN_LANG_PREF,
  SCREEN_PREF,
  SCREEN_VOLUME_PREF,
} from '../constants/ActionTypes'
import { I18nContext } from '../i18n/I18nContext'

const useStyles = createUseStyles({
  '@keyframes rotate': {
    from: {
      transform: 'rotate(0deg)',
    },
    to: {
      transform: 'rotate(360deg)',
    },
  },

  '@keyframes updown': {
    '0%, 100%': {
      transform: 'translateY(0)',
    },
    '50%': {
      transform: 'translateY(2px)',
    },
  },

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

  prefButton: {
    'background-image': `url(${iconPref})`,
    left: '66.666%',
    '&:hover, &.windowactive': {
      animation: '$rotate 2s linear infinite',
    },
  },
  langPrefButton: {
    'background-image': `url(${iconLangPref})`,
    left: 'calc(66.666% + 3rem)',
    '&:hover, &.windowactive': {
      animation: '$updown 2s linear infinite',
    },
  },
  volumePrefButton: {
    'background-image': `url(${iconVolumePref})`,
    left: 'calc(66.666% + 6rem)',
    '&:hover, &.windowactive': {
      animation: '$rotate2 2s linear infinite',
    },
  },
  helpButton: {
    'background-image': `url(${iconHelp})`,
    left: 'calc(66.666% + 9rem)',
    '&:hover, &.windowactive': {
      animation: '$rotate2 2s linear infinite',
    },
  },
})

const ButtonBar = () => {
  const classes = useStyles()
  const trans = useContext(I18nContext)

  const pref = useAppSelector((state) => state.screen.pref)
  const langPref = useAppSelector((state) => state.screen.langPref)
  const volumePref = useAppSelector((state) => state.screen.volumePref)
  const help = useAppSelector((state) => state.screen.help)

  const dispatch = useAppDispatch()

  return (
    <div>
      <button
        title={trans.i18n?.['Preferences']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100',
          classes.prefButton,
          { windowactive: pref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_PREF,
            show: true,
          })
        }}
      ></button>
      <button
        title={trans.i18n?.['Language']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100',
          classes.langPrefButton,
          { windowactive: langPref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_LANG_PREF,
            show: true,
          })
        }}
      ></button>
      <button
        title={trans.i18n?.['Volume']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100',
          classes.volumePrefButton,
          { windowactive: volumePref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_VOLUME_PREF,
            show: true,
          })
        }}
      ></button>
      <button
        title={trans.i18n?.['Help']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100',
          classes.helpButton,
          { windowactive: help },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_HELP,
            show: true,
          })
        }}
      ></button>
    </div>
  )
}

export default memo(ButtonBar)
