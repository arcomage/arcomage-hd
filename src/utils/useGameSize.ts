import { useState, useLayoutEffect } from 'react'

export const minWidth = 300
export const minHeight = 300

type vType = {
  width: number
  height: number
}

const useGameSize = () => {
  const v: vType = {
    width: 0,
    height: 0,
  }

  const [gameSize, setGameSize] = useState(v)

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

  return gameSize
}

export default useGameSize
