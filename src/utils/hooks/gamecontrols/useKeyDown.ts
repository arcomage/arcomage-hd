import { useEffect, useRef } from 'react'

// Note: `func` should nearly always be wrapped in useCallback
const useKeyDown = (
  targetKey: string | null, // `null` represents any key
  func: (event: KeyboardEvent) => void,
  delay: number = 0,
  altKey: boolean = false,
  ctrlKey: boolean = false,
  metaKey: boolean = false,
  shiftKey: boolean = false,
) => {
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (
        (targetKey === null || event.key === targetKey) &&
        altKey === event.altKey &&
        ctrlKey === event.ctrlKey &&
        metaKey === event.metaKey &&
        shiftKey === event.shiftKey
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
  }, [targetKey, func, delay, altKey, ctrlKey, metaKey, shiftKey])
}

export default useKeyDown
