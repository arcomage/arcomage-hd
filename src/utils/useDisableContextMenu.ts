import { useEffect } from 'react'

const useDisableContextMenu = () => {
  useEffect(() => {
    const onContextMenu = (e: MouseEvent): void => {
      e.preventDefault()
    }
    window.addEventListener('contextmenu', onContextMenu)
    return () => window.removeEventListener('contextmenu', onContextMenu)
  }, [])
}

export default useDisableContextMenu
