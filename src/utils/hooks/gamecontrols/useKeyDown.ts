import { useEffect, useRef } from 'react'

const useKeyDown = (
  targetKey: string | null, // `null` represents any key
  func: (event: KeyboardEvent) => void,
  delay: number = 0,
  modifierKeys: ('alt' | 'ctrl' | 'meta' | 'shift')[] = [],
) => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (targetKey === null || event.key === targetKey) &&
        modifierKeys.every((mod) => event[`${mod}Key`])
      ) {
        if (delay > 0) {
          if (timeoutRef.current !== null) {
            clearTimeout(timeoutRef.current)
          }
          timeoutRef.current = window.setTimeout(() => func(event), delay)
        } else {
          func(event)
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      if (timeoutRef.current !== null) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [targetKey, func, delay, modifierKeys])
}

export default useKeyDown
