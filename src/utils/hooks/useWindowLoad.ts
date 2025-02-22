import { useEffect } from 'react'

// Note: `func` should nearly always be wrapped in useCallback
const useWindowLoad = (func: () => void) => {
  useEffect(() => {
    if (document.readyState === 'complete') {
      func()
    } else {
      window.addEventListener('load', func)
    }

    return () => {
      window.removeEventListener('load', func)
    }
  }, [func])
}

export default useWindowLoad
