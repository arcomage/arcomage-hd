import { useEffect } from 'react'
import { disableContextMenu } from '../constants/devSettings'

const useDisableContextMenu = () => {
  useEffect(() => {
    if (disableContextMenu) {
      const onContextMenu = (e: MouseEvent): void => {
        if (
          e.target !== null &&
          e.target instanceof Element &&
          e.target.closest('.window-wrapper') === null
        ) {
          e.preventDefault()
        }
      }
      window.addEventListener('contextmenu', onContextMenu)
      return () => window.removeEventListener('contextmenu', onContextMenu)
    }
  }, [])
}

export default useDisableContextMenu
