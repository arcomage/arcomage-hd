import React, { memo, useContext } from 'react'
import cx from 'classnames'
import { createUseStyles } from 'react-jss'
import { useAppSelector, useAppDispatch } from '../utils/useAppDispatch'

import {
  SCREEN_HELP,
  SCREEN_LANG_PREF,
  SCREEN_PREF,
  SCREEN_VOLUME_PREF,
} from '../constants/ActionTypes'
import { I18nContext } from '../i18n/I18nContext'

const useStyles = createUseStyles({
  topButton: {
    '& svg': {
      fill: '#fff',
    },
  },
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

  '@keyframes visible1-3': {
    '24.99%': {
      visibility: 'hidden',
    },
    '49.99%': {
      visibility: 'visible',
    },
    '74.99%': {
      visibility: 'visible',
    },
    '99.99%': {
      visibility: 'visible',
    },
  },

  '@keyframes visible2-3': {
    '24.99%': {
      visibility: 'hidden',
    },
    '49.99%': {
      visibility: 'hidden',
    },
    '74.99%': {
      visibility: 'visible',
    },
    '99.99%': {
      visibility: 'visible',
    },
  },

  '@keyframes visible3-3': {
    '24.99%': {
      visibility: 'hidden',
    },
    '49.99%': {
      visibility: 'hidden',
    },
    '74.99%': {
      visibility: 'hidden',
    },
    '99.99%': {
      visibility: 'visible',
    },
  },

  prefButton: {
    left: '66.666%',
    '&:hover, &.windowactive': {
      '& svg': {
        animation: '$rotate 2s linear infinite',
      },
    },
  },
  langPrefButton: {
    left: 'calc(66.666% + 3rem)',
    '&:hover, &.windowactive': {
      '& svg': {
        '& .el-1': {
          visibility: 'hidden',
          animation: '$visible1-3 2s linear infinite',
        },
        '& .el-2': {
          visibility: 'hidden',
          animation: '$visible2-3 2s linear infinite',
        },
        '& .el-3': {
          visibility: 'hidden',
          animation: '$visible3-3 2s linear infinite',
        },
      },
    },
  },
  volumePrefButton: {
    left: 'calc(66.666% + 6rem)',
    '&:hover, &.windowactive': {
      '& svg': {
        '& .el-1': {
          visibility: 'hidden',
          animation: '$visible1-3 2s linear infinite',
        },
        '& .el-2': {
          visibility: 'hidden',
          animation: '$visible2-3 2s linear infinite',
        },
        '& .el-3': {
          visibility: 'hidden',
          animation: '$visible3-3 2s linear infinite',
        },
      },
    },
  },
  helpButton: {
    left: 'calc(66.666% + 9rem)',
    '&:hover, &.windowactive': {
      '& svg': {
        animation: '$rotate2 2s linear infinite',
      },
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
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100 overflow-hidden',
          classes.topButton,
          classes.prefButton,
          { windowactive: pref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_PREF,
            show: true,
          })
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
        </svg>
      </button>
      <button
        title={trans.i18n?.['Language']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100 overflow-hidden',
          classes.topButton,
          classes.langPrefButton,
          { windowactive: langPref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_LANG_PREF,
            show: true,
          })
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="el-0"
            d="m0.35579 8.7757v-7.824h1.764v6.336h3.096v1.488z"
          />
          <path
            className="el-1"
            d="m7.3323 4.8159-0.192 0.72h1.668l-0.18-0.72q-0.168-0.58802-0.324-1.248t-0.312-1.272h-0.048q-0.144 0.624-0.3 1.284-0.144 0.648-0.312 1.236zm-2.832 3.9602 2.448-7.824h2.124l2.448 7.824h-1.872l-0.48-1.86h-2.388l-0.48 1.86z"
          />
          <path
            className="el-2"
            d="m11.364 8.7757v-7.824h1.812l2.04 3.888 0.768 1.728h0.048q-0.06-0.624-0.144-1.392-0.072-0.768-0.072-1.464v-2.76h1.68v7.824h-1.812l-2.04-3.9001-0.768-1.704h-0.048q0.06 0.648 0.132 1.392 0.084 0.744 0.084 1.44v2.772z"
          />
          <path
            className="el-3"
            d="m21.228 8.9197q-0.80398 0-1.512-0.252-0.696-0.264-1.212-0.768t-0.816-1.248q-0.288-0.75598-0.288-1.74 0-0.97202 0.3-1.728 0.3-0.768 0.816-1.296 0.528-0.528 1.224-0.80398t1.476-0.276q0.85198 0 1.464 0.312t0.99598 0.70798l-0.92402 1.128q-0.3-0.264-0.63602-0.44402t-0.84-0.18q-0.456 0-0.84 0.18-0.372 0.168-0.648 0.49202t-0.432 0.792q-0.144 0.46798-0.144 1.056 0 1.212 0.54002 1.884 0.552 0.65998 1.656 0.65998 0.24 0 0.46798-0.06t0.372-0.18v-1.344h-1.296v-1.44h2.856v3.6q-0.408 0.39602-1.08 0.672t-1.5 0.276z"
          />
          <path
            className="el-0"
            d="m10.71 12.09h-2.82l1.095-0.615c-0.24-0.54002-0.705-1.335-1.11-1.95l-1.095 0.54002c0.40501 0.615 0.855 1.47 1.08 2.025h-2.715v1.11h5.565zm-0.52502 1.995h-4.4251v1.095h4.4251zm-4.4251 3.06h4.4251v-1.065h-4.4251z"
          />
          <path
            className="el-1"
            d="m9.0749 19.215v2.145h-2.13v-2.145zm1.215-1.125h-4.5449v5.0699h1.2v-0.67498h3.345z"
          />
          <path
            className="el-2"
            d="m16.23 13.83v1.995h-2.46c0.12-0.585 0.255-1.275 0.39001-1.995zm1.29 1.995v-3.135h-3.135c0.06-0.44999 0.15-0.91499 0.225-1.335h3.9148v-1.17h-7.6199v1.17h2.325c-0.06 0.41998-0.135 0.88502-0.225 1.335h-1.74v1.14h1.545c-0.135 0.72-0.27 1.41-0.40501 1.995h-1.89v1.155h8.3399v-1.155z"
          />
          <path
            className="el-3"
            d="m16.65 19.11v2.43h-4.035v-2.43zm-5.325 4.2452h1.29v-0.6h4.035v0.54002h1.35v-5.4002h-6.675z"
          />
        </svg>
      </button>
      <button
        title={trans.i18n?.['Volume']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100 overflow-hidden',
          classes.topButton,
          classes.volumePrefButton,
          { windowactive: volumePref },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_VOLUME_PREF,
            show: true,
          })
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path
            className="el-0"
            d="m12.609 3.606a0.80007 0.80007 0 0 0-0.02447 2.832e-4 0.80007 0.80007 0 0 0-0.50306 0.195l-5.2638 4.5525h-4.8975a0.80007 0.80007 0 0 0-0.8 0.8v6.11a0.80007 0.80007 0 0 0 0.8 0.80007h4.8187l5.3425 4.6212a0.80007 0.80007 0 0 0 1.3231-0.60497v-15.674a0.80007 0.80007 0 0 0-0.79553-0.80027z"
          />
          <path
            className="el-1"
            d="m15.344 8.0319c-0.15037 0.00316-0.2968 0.048654-0.4225 0.13125-0.36963 0.2424-0.47262 0.73862-0.23 1.1081 1.1907 1.8141 1.1907 4.1559 0 5.97-0.24222 0.36936-0.13926 0.86513 0.23 1.1075 0.36936 0.24222 0.86513 0.13926 1.1075-0.23 1.5381-2.3435 1.5381-5.3821 0-7.7253-0.15095-0.23027-0.40971-0.36674-0.685-0.36125z"
          />
          <path
            className="el-2"
            d="m17.615 5.76c-0.16475 0.00378-0.32431 0.058355-0.45687 0.15625-0.35534 0.2621-0.43114 0.76252-0.16937 1.1181 2.2905 3.1074 2.2905 7.336 0 10.443-0.26218 0.35568-0.18635 0.85657 0.16937 1.1187 0.35568 0.26218 0.85657 0.18635 1.1187-0.16937 2.7026-3.6665 2.7026-8.6747 0-12.341-0.15443-0.20985-0.40138-0.33134-0.66187-0.32563z"
          />
          <path
            className="el-3"
            d="m19.704 3.68c-0.17928 0.0019-0.35272 0.063973-0.4925 0.17625-0.34479 0.27659-0.39993 0.78038-0.12313 1.125 3.4165 4.2529 3.4165 10.297 0 14.55-0.27639 0.34452-0.22127 0.84786 0.12313 1.1244 0.34436 0.27654 0.84767 0.2217 1.1244-0.1225 3.8811-4.8311 3.8811-11.723 0-16.555-0.15368-0.19119-0.38658-0.30131-0.63187-0.29875z"
          />
        </svg>
      </button>
      <button
        title={trans.i18n?.['Help']}
        className={cx(
          'absolute top-1 bg-no-repeat bg-contain bg-covert w-8 h-8 opacity-60 transition-opacity duration-500 hover:opacity-100 overflow-hidden',
          classes.topButton,
          classes.helpButton,
          { windowactive: help },
        )}
        onClick={() => {
          dispatch({
            type: SCREEN_HELP,
            show: true,
          })
        }}
      >
        <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.001,2.085c-5.478,0-9.916,4.438-9.916,9.916,c0,5.476,4.438,9.914,9.916,9.914c5.476,0,9.914-4.438,9.914-9.914C21.915,6.523,17.477,2.085,12.001,2.085z M12.002,20.085,c-4.465,0-8.084-3.619-8.084-8.083c0-4.465,3.619-8.084,8.084-8.084c4.464,0,8.083,3.619,8.083,8.084,C20.085,16.466,16.466,20.085,12.002,20.085z" />
          <path d="M11.766,6.688c-2.5,0-3.219,2.188-3.219,2.188l1.411,0.854,c0,0,0.298-0.791,0.901-1.229c0.516-0.375,1.625-0.625,2.219,0.125c0.701,0.885-0.17,1.587-1.078,2.719,C11.047,12.531,11,15,11,15h1.969c0,0,0.135-2.318,1.041-3.381c0.603-0.707,1.443-1.338,1.443-2.494S14.266,6.688,11.766,6.688z" />
          <rect x="11" y="16" width="2" height="2" />
        </svg>
      </button>
    </div>
  )
}

export default memo(ButtonBar)
