import { useState, useLayoutEffect } from 'react'

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
        width: window.innerWidth > 300 ? window.innerWidth : 300,
        height: window.innerHeight > 600 ? window.innerHeight : 600,
      })
    }

    window.addEventListener('resize', handleResize)

    handleResize()

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return gameSize
}

export default useGameSize
