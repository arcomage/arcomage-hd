import React, { memo } from 'react'
import './App.scss'
import Game from './components/Game'
import {
  disableContextMenu,
  enableWindowUnloadWarning,
} from './constants/devSettings'
import { useAppDispatch } from './utils/useAppDispatch'

import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/useDisableContextMenu'
import useWindowLoad from './utils/useWindowLoad'

const App = () => {
  const dispatch = useAppDispatch()

  useWindowLoad(() => {
    dispatch({
      type: 'INIT',
    })
  })

  disableContextMenu && useDisableContextMenu()

  enableWindowUnloadWarning && useBeforeWindowUnloadWarning()

  return <Game />
}

export default memo(App)
