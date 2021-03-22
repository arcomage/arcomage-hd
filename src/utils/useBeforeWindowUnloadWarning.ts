import { useEffect } from 'react'

const useBeforeWindowUnloadWarning = () => {
  useEffect(() => {
    const onUnload = (e: BeforeUnloadEvent): void => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onUnload)
    return () => window.removeEventListener('beforeunload', onUnload)
  }, [])
}

export default useBeforeWindowUnloadWarning
