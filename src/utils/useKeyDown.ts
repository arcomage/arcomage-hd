import { useEffect } from 'react'

const useKeyDown = (
  targetKey: string | null, // `null` represents any key
  func: (event: KeyboardEvent) => void,
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKey == null || event.key === targetKey) {
        func(event)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useKeyDown
