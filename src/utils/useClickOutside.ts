import { MutableRefObject, useEffect } from 'react'

const useClickOutside = (
  ref: MutableRefObject<HTMLElement | null>,
  func: (event: MouseEvent) => void,
): void => {
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        event instanceof PointerEvent &&
        event.pointerType === 'mouse' &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        func(event)
      }
    }
    const handleClickOutsideNonMouse = (event: MouseEvent) => {
      if (
        event instanceof PointerEvent &&
        event.pointerType !== 'mouse' &&
        ref.current &&
        !ref.current.contains(event.target as Node)
      ) {
        func(event)
      }
    }
    const handleMousedown = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        window.addEventListener('click', handleClickOutside)
        window.addEventListener('auxclick', handleClickOutside)
      }
    }
    window.addEventListener('mousedown', handleMousedown)
    window.addEventListener('click', handleClickOutsideNonMouse)

    return () => {
      window.removeEventListener('mousedown', handleMousedown)
      window.removeEventListener('click', handleClickOutside)
      window.removeEventListener('auxclick', handleClickOutside)
      window.removeEventListener('click', handleClickOutsideNonMouse)
    }
  }, [])
}

export default useClickOutside
