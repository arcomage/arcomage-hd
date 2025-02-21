import { useEffect } from 'react'

const useWindowLoad = (func: (event: Event) => void) => {
  useEffect(() => {
    const handleLoad = (event: Event) => {
      func(event)
    }

    window.addEventListener('load', handleLoad)

    return () => {
      window.removeEventListener('load', handleLoad)
    }
  }, [func])
}

export default useWindowLoad
