import { useEffect } from 'react'

const useWindowLoad = (func: (event: Event) => void) => {
  useEffect(() => {
    const onLoad = (event: Event): void => {
      func(event)
    }
    window.addEventListener('load', onLoad)
    return () => window.removeEventListener('load', onLoad)
  }, [])
}

export default useWindowLoad
