import React, { memo, useContext, useEffect } from 'react'
import './App.scss'
import Game from './components/Game'
import { useAppDispatch, useAppSelector } from './utils/useAppDispatch'

import { Helmet } from 'react-helmet-async'

import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/useDisableContextMenu'
import useWindowLoad from './utils/useWindowLoad'
import { I18nContext } from './i18n/I18nContext'
import { GameSizeContext } from './utils/GameSizeContext'
import { minRootFontSize, smallRootFontScreenMax } from './constants/visuals'
import { langInfo } from './i18n/langs'
import SvgFilters from './components/effects/SvgFilters'

const App = () => {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.lang.code)
  const erathian: boolean = useAppSelector((state) => state.lang.erathian)
  const _ = useContext(I18nContext)
  const { width, height } = useContext(GameSizeContext)

  useWindowLoad(() => {
    dispatch({
      type: 'READLS_UPDATESTORE_INIT',
    })
  })

  useDisableContextMenu()
  useBeforeWindowUnloadWarning()

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
          data-erathian={(erathian && langInfo[lang].isLatinScript).toString()}
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
