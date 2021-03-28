import React, { useState, useLayoutEffect, createContext } from 'react'

export const minWidth = 300
export const minHeight = 300

export type vType = {
  width: number
  height: number
}

const defaultGameSize = {
  width: 0,
  height: 0,
}

export const GameSizeContext = createContext<vType>(defaultGameSize)

export const GameSizeProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const [gameSize, setGameSize] = useState<vType>(defaultGameSize)
  useLayoutEffect(() => {
    const handleResize = () => {
      setGameSize({
        width: window.innerWidth > minWidth ? window.innerWidth : minWidth,
        height: window.innerHeight > minHeight ? window.innerHeight : minHeight,
      })
    }

    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <GameSizeContext.Provider value={gameSize}>
      {children}
    </GameSizeContext.Provider>
  )
}
