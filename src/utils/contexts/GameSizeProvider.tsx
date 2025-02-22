import React, { useEffect, useState } from 'react'
import { defaultGameSize, GameSizeContext, vType } from './GameSizeContext'
import { narrowMobileWinHeightMax } from '../../constants/visuals'

type PropType = {
  children: React.ReactNode
}

const GameSizeProvider = ({ children }: PropType) => {
  const [gameSize, setGameSize] = useState<vType>(defaultGameSize)
  useEffect(() => {
    const handleResize = () => {
      setGameSize({
        width: window.innerWidth,
        height: window.innerHeight,
        narrowMobile: window.innerHeight <= narrowMobileWinHeightMax,
        // note: consider 320px width × 480px height as the minimum size for mobile devices
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

export default GameSizeProvider
