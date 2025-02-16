import { RefObject, useEffect } from 'react'

const useClickOutside = (
  ref: RefObject<HTMLElement | null>,
  func: (event: MouseEvent) => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func(event)
      }
    }

    // mousedown only to prevent the situation where user "mousedown" inside the window and select text or do other things which ends up "mouseup" outside the window
    window.addEventListener('mousedown', handleClickOutside)

    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}

export default useClickOutside
