import React, { memo, useContext } from 'react'
import './App.scss'
import Game from './components/Game'
import {
  disableContextMenu,
  enableWindowUnloadWarning,
} from './constants/devSettings'
import { useAppDispatch, useAppSelector } from './utils/useAppDispatch'

import { Helmet } from 'react-helmet-async'

import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/useDisableContextMenu'
import useWindowLoad from './utils/useWindowLoad'
import { I18nContext } from './i18n/I18nContext'

const App = () => {
  const dispatch = useAppDispatch()
  const lang = useAppSelector((state) => state.lang.code)
  const _ = useContext(I18nContext)

  useWindowLoad(() => {
    dispatch({
      type: 'INIT',
    })
  })

  disableContextMenu && useDisableContextMenu()

  enableWindowUnloadWarning && useBeforeWindowUnloadWarning()

  return (
    <>
      <Helmet>
        <html lang={lang} />
        <title>{_.i18n('ArcoMage HD')}</title>
        <meta property="og:title" content={_.i18n('ArcoMage HD')} />
        <meta name="description" content={_.i18n('DESC')} />
        <meta property="og:description" content={_.i18n('DESC')} />
      </Helmet>
      <Game />
    </>
  )
}

export default memo(App)
