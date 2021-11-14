import { useEffect } from 'react'
import { enableWindowUnloadWarning } from '../constants/devSettings'

const useBeforeWindowUnloadWarning = () => {
  useEffect(() => {
    if (enableWindowUnloadWarning) {
      const onUnload = (e: BeforeUnloadEvent): void => {
        e.preventDefault()
        e.returnValue = ''
      }
      window.addEventListener('beforeunload', onUnload)
      return () => {
        window.removeEventListener('beforeunload', onUnload)
      }
    }
  }, [])
}

export default useBeforeWindowUnloadWarning
