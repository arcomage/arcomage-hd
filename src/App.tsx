import React, { useCallback, useContext, useEffect } from 'react'
import SvgFilters from '@/components/effects/SvgFilters'
import Game from '@/components/Game'
import HtmlHead from '@/components/HtmlHead'
import { UPDATE_VISUALVALUES } from '@/constants/ActionTypes'
import { defaultVisualvalues } from '@/constants/defaultSettings'
import { minRootFontSize, smallRootFontScreenMax } from '@/constants/visuals'
import { GameSizeContext } from '@/utils/contexts/GameSizeContext'
import { handleGamepadButtonDown } from '@/utils/hooks/gamecontrols/handleGamepad'
import useArrowKeyFocus from '@/utils/hooks/gamecontrols/useArrowKeyFocus'
import useDisableContextMenu from '@/utils/hooks/gamecontrols/useDisableContextMenu'
import useGamepad from '@/utils/hooks/gamecontrols/useGamepad'
import useKeyDown from '@/utils/hooks/gamecontrols/useKeyDown'
import { useAppDispatch } from '@/utils/hooks/useAppDispatch'
import { useBeforeWindowUnloadWarning } from '@/utils/hooks/useBeforeWindowUnloadWarning'
import useWindowLoad from '@/utils/hooks/useWindowLoad'

const App = () => {
  const dispatch = useAppDispatch()

  const { width, height } = useContext(GameSizeContext)

  const onWindowLoad = useCallback(() => {
    dispatch({
      type: 'READLS_UPDATESTORE_INIT',
    })
    // no lint reason: dispatch function is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useWindowLoad(onWindowLoad)

  useDisableContextMenu()
  useBeforeWindowUnloadWarning()

  useArrowKeyFocus()

  const onKeyDown = useCallback(() => {
    dispatch({
      type: UPDATE_VISUALVALUES,
      payload: defaultVisualvalues,
    })
    // no lint reason: dispatch function is stable
    // eslint-disable-next-line react-compiler/react-compiler
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useKeyDown('o', onKeyDown, 0, true)

  const _handleGamepadButtonDown = useCallback(handleGamepadButtonDown, [])
  useGamepad({
    onButtonDown: _handleGamepadButtonDown,
  })

  useEffect(() => {
    const checkAndShowLandscapeNotice = () => {
      const isPortrait = window.matchMedia('(orientation:portrait)').matches
      dispatch({
        type: 'SCREEN_LANDSCAPE',
        show: isPortrait,
      })
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
