import React, { memo } from 'react'
import './App.scss'
import Game from './components/Game'
import useBeforeWindowUnloadWarning from './utils/useBeforeWindowUnloadWarning'

const App = () => {
  // useBeforeWindowUnloadWarning()
  return <Game />
}

export default memo(App)
