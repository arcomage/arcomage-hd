import { MutableRefObject, useEffect } from 'react'

const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  func: (event: MouseEvent) => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        func(event)
      }
    }

    window.addEventListener('mousedown', handleClickOutside)
    return () => {
      window.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])
}

export default useClickOutside
