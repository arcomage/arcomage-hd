import React, { memo } from 'react'
import './App.scss'
import Game from './components/Game'
import {
  disableContextMenu,
  enableWindowUnloadWarning,
} from './constants/devSettings'
import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/useDisableContextMenu'

const App = () => {
  disableContextMenu && useDisableContextMenu()
  enableWindowUnloadWarning && useBeforeWindowUnloadWarning()

  return <Game />
}

export default memo(App)
