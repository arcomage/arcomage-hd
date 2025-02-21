import React, { useContext, useEffect } from 'react'
import './App.scss'
import Game from './components/Game'
import { useAppDispatch } from './utils/hooks/useAppDispatch'

import { useBeforeWindowUnloadWarning } from './utils/hooks/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/hooks/gamecontrols/useDisableContextMenu'
import useWindowLoad from './utils/hooks/useWindowLoad'
import { GameSizeContext } from './utils/contexts/GameSizeContext'
import { minRootFontSize, smallRootFontScreenMax } from './constants/visuals'
import SvgFilters from './components/effects/SvgFilters'
import useArrowKeyFocus from './utils/hooks/gamecontrols/useArrowKeyFocus'
import useKeyDown from './utils/hooks/gamecontrols/useKeyDown'
import { UPDATE_VISUALVALUES } from './constants/ActionTypes'
import { defaultVisualvalues } from './constants/defaultSettings'
import useGamepad from './utils/hooks/gamecontrols/useGamepad'
import { handleGamepadButtonDown } from './utils/hooks/gamecontrols/handleGamepad'
import HtmlHead from './components/HtmlHead'

const App = () => {
  const dispatch = useAppDispatch()
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
    // no lint reason: dispatch function is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [width, height])

  return (
    <>
      <HtmlHead />
      <Game />
      <SvgFilters />
    </>
  )
}

export default App
