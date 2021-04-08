import React, { useState, useLayoutEffect, createContext } from 'react'

export const minWidth = 300
export const minHeight = 300

export type vType = {
  width: number
  height: number
}

const defaultGameSize = {
  width: window.innerWidth,
  height: window.innerHeight,
}

export const GameSizeContext = createContext<vType>(defaultGameSize)

type PropType = {
  children: React.ReactNode
}
export const GameSizeProvider = ({ children }: PropType) => {
  const [gameSize, setGameSize] = useState<vType>(defaultGameSize)
  useLayoutEffect(() => {
    const handleResize = () => {
      setGameSize({
        width: window.innerWidth > minWidth ? window.innerWidth : minWidth,
        height: window.innerHeight > minHeight ? window.innerHeight : minHeight,
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
