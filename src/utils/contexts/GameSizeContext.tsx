import React, { createContext } from 'react'
import useWindowResize, { vType } from '../hooks/useWindowResize'

export const GameSizeContext = createContext<vType>({
  width: window.innerWidth,
  height: window.innerHeight,
  narrowMobile: false,
})

type PropType = {
  children: React.ReactNode
}

export const GameSizeProvider = ({ children }: PropType) => {
  const gameSize = useWindowResize()

  return (
    <GameSizeContext.Provider value={gameSize}>
      {children}
    </GameSizeContext.Provider>
  )
}
