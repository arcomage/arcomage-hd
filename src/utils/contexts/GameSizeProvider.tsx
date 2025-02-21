import React from 'react'
import useWindowResize from '../hooks/useWindowResize'
import { GameSizeContext } from './GameSizeContext'

type PropType = {
  children: React.ReactNode
}

const GameSizeProvider = ({ children }: PropType) => {
  const gameSize = useWindowResize()

  return (
    <GameSizeContext.Provider value={gameSize}>
      {children}
    </GameSizeContext.Provider>
  )
}

export default GameSizeProvider
