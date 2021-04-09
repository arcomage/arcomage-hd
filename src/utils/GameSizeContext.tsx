import React, { useState, useEffect, createContext } from 'react'
import { narrowMobileWinHeightMax } from '../constants/visuals'

export type vType = {
  width: number
  height: number
  narrowMobile: boolean
}

const defaultGameSize = {
  width: window.innerWidth,
  height: window.innerHeight,
  narrowMobile: false,
}

export const GameSizeContext = createContext<vType>(defaultGameSize)

type PropType = {
  children: React.ReactNode
}
export const GameSizeProvider = ({ children }: PropType) => {
  const [gameSize, setGameSize] = useState<vType>(defaultGameSize)
  useEffect(() => {
    const handleResize = () => {
      setGameSize({
        width: window.innerWidth,
        height: window.innerHeight,
        narrowMobile: window.innerHeight <= narrowMobileWinHeightMax,
      })
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('orientationchange', handleResize)
    handleResize()
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('orientationchange', handleResize)
    }
  }, [])

  return (
    <GameSizeContext.Provider value={gameSize}>
      {children}
    </GameSizeContext.Provider>
  )
}
