import { useEffect } from 'react'

const useKeyDown = (
  targetKey: string | null, // `null` represents any key
  func: (event: KeyboardEvent) => void,
  delay: number = 0,
  modifierKeys: ('alt' | 'ctrl' | 'meta' | 'shift')[] = [],
): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (targetKey == null || event.key === targetKey) {
        if (modifierKeys.every((key) => event[`${key}Key`])) {
          func(event)
        }
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
