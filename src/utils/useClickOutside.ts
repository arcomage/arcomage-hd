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

    window.addEventListener('click', handleClickOutside)
    window.addEventListener('auxclick', handleClickOutside)

    return () => {
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('auxclick', handleClickOutside)
    }
  }, [])
}

export default useClickOutside
