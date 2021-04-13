import { useEffect } from 'react'

const useDisableContextMenu = () => {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent): void => {
      if (
        e.target !== null &&
        e.target instanceof HTMLElement &&
        e.target.closest('.window-wrapper') === null
      ) {
        e.preventDefault()
      }
    }
    window.addEventListener('contextmenu', onContextMenu)
    return () => window.removeEventListener('contextmenu', onContextMenu)
  }, [])
}

export default useDisableContextMenu
