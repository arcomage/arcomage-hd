import { useEffect } from 'react'
import { enableWindowUnloadWarning } from '../../constants/devSettings'

export const beforeWindowUnloadFn = (e: BeforeUnloadEvent): void => {
  e.preventDefault()
  e.returnValue = ''
}

export const useBeforeWindowUnloadWarning = () => {
  useEffect(() => {
    if (enableWindowUnloadWarning) {
      window.addEventListener('beforeunload', beforeWindowUnloadFn)
      return () => {
        window.removeEventListener('beforeunload', beforeWindowUnloadFn)
      }
    }
  }, [])
}
