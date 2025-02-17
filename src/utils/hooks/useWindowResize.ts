import { useState, useEffect } from 'react'
import { narrowMobileWinHeightMax } from '../../constants/visuals'

export type vType = {
  width: number
  height: number
  narrowMobile: boolean
}

const useWindowResize = (): vType => {
  const [size, setSize] = useState<vType>({
    width: window.innerWidth,
    height: window.innerHeight,
    narrowMobile: window.innerHeight <= narrowMobileWinHeightMax,
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
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

  return size
}

export default useWindowResize
