import { useEffect } from 'react'

const useKeyDown = (
  targetKey: string | null, // `null` represents any key
  func: (event: KeyboardEvent) => void,
  delay: number = 0,
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKey == null || event.key === targetKey) {
        func(event)
      }
    }

    const timer: ReturnType<typeof setTimeout> = setTimeout(() => {
      window.addEventListener('keydown', handleKeyDown)
    }, delay)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useKeyDown
