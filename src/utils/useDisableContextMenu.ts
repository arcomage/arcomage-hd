import { useEffect } from 'react'
import { disableContextMenu } from '../constants/devSettings'

const useDisableContextMenu = () => {
  useEffect(() => {
    if (disableContextMenu) {
      const onContextMenu = (e: MouseEvent): void => {
        if (
          e.target !== null &&
          e.target instanceof Element &&
          e.target.closest('input[type="text"]') === null &&
          e.target.closest('input[type="number"]') === null &&
          e.target.closest('small.version') === null &&
          e.target.closest('p.description') === null &&
          e.target.closest('.help-text') === null
        ) {
          e.preventDefault()
        }
      }
      window.addEventListener('contextmenu', onContextMenu)
      return () => {
        window.removeEventListener('contextmenu', onContextMenu)
      }
    }
  }, [])
}

export default useDisableContextMenu
