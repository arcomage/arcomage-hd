import React, { memo, useContext, useEffect } from 'react'
import './App.scss'
import Game from './components/Game'
import { useAppDispatch, useAppSelector } from './utils/hooks/useAppDispatch'

import { Helmet } from 'react-helmet-async'

import useBeforeWindowUnloadWarning from './utils/hooks/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/hooks/gamecontrols/useDisableContextMenu'
import useWindowLoad from './utils/hooks/useWindowLoad'
import { I18nContext } from './i18n/I18nContext'
import { GameSizeContext } from './utils/contexts/GameSizeContext'
import { minRootFontSize, smallRootFontScreenMax } from './constants/visuals'
import { langInfo } from './i18n/langs'
import SvgFilters from './components/effects/SvgFilters'
import { setVolume } from './utils/sound/Sound'
import useArrowKeyFocus from './utils/hooks/gamecontrols/useArrowKeyFocus'
import useKeyDown from './utils/hooks/gamecontrols/useKeyDown'
import { UPDATE_VISUALVALUES } from './constants/ActionTypes'
import { defaultVisualvalues } from './constants/defaultSettings'
import useGamepad from './utils/hooks/gamecontrols/useGamepad'
import { handleGamepadButtonDown } from './utils/hooks/gamecontrols/handleGamepad'

const App = () => {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.lang.code)
  const volume = useAppSelector((state) => state.sound.volume)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const noanim: boolean = useAppSelector((state) => state.visual.noanim)
  const _ = useContext(I18nContext)
  const { width, height } = useContext(GameSizeContext)

  useWindowLoad(() => {
    dispatch({
      type: 'READLS_UPDATESTORE_INIT',
    })
  })

  useDisableContextMenu()
  useBeforeWindowUnloadWarning()

  useArrowKeyFocus()

  useKeyDown(
    'o',
    () => {
      dispatch({
        type: UPDATE_VISUALVALUES,
        payload: defaultVisualvalues,
      })
    },
    0,
    ['alt'],
  )

  useGamepad({
    onButtonDown: handleGamepadButtonDown,
  })

  useEffect(() => {
    setVolume(volume)
  }, [volume])

  useEffect(() => {
    const checkAndShowLandscapeNotice = () => {
      const isPortrait = window.matchMedia('(orientation:portrait)').matches
      if (isPortrait) {
        dispatch({
          type: 'SCREEN_LANDSCAPE',
          show: true,
        })
      } else {
        dispatch({
          type: 'SCREEN_LANDSCAPE',
          show: false,
        })
      }
    }

    const checkAndSetRootFontSize = (winWidth: number, winHeight: number) => {
      const screenLength = Math.min(winWidth, winHeight)
      if (screenLength < smallRootFontScreenMax) {
        const fontSize =
          ((16 - minRootFontSize) / smallRootFontScreenMax) * screenLength +
          minRootFontSize
        document.documentElement.style.fontSize = `${fontSize}px`
      } else {
        document.documentElement.style.fontSize = ''
      }
    }

    checkAndShowLandscapeNotice()
    checkAndSetRootFontSize(width, height)
  }, [width, height])

  return (
    <>
      <Helmet>
        <html
          lang={lang}
          dir={langInfo[lang].isRtl ? 'rtl' : 'ltr'}
          data-erathian={(erathian && langInfo[lang].isLatinScript).toString()}
          data-noanime={noanim.toString()}
        />
        <title>{_.i18n('ArcoMage HD')}</title>
        <meta name="title" content={_.i18n('ArcoMage HD')} />
        <meta name="description" content={_.i18n('DESC')} />
        <meta property="og:locale" content={lang} />
        <meta property="og:title" content={_.i18n('ArcoMage HD')} />
        <meta property="og:description" content={_.i18n('DESC')} />
        <meta name="twitter:title" content={_.i18n('ArcoMage HD')} />
        <meta name="twitter:description" content={_.i18n('DESC')} />
      </Helmet>
      <Game />
      <SvgFilters />
    </>
  )
}

export default memo(App)
