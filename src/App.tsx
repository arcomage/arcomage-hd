import React, { memo } from 'react'
import './App.scss'
import Game from './components/Game'
import {
  enableContextMenu,
  disableWindowUnloadWarning,
} from './constants/devSettings'
import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'
import useDisableContextMenu from './utils/useDisableContextMenu'

const App = () => {
  !enableContextMenu && useDisableContextMenu()
  !disableWindowUnloadWarning && useBeforeWindowUnloadWarning()

  return <Game />
}

export default memo(App)
