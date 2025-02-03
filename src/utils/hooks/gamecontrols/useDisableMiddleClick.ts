import { useEffect } from 'react'

// TODO: not working at all

// TODO do not prevent external link middle click

const useDisableMiddleClick = () => {
  useEffect(() => {
    const onAuxClick = (e: MouseEvent): void => {
      console.log('aux click')
      if (e.button === 1) {
        console.log('middle click')
        // 1 is the middle button, 2 is the right button (but if need to handle right button, use `onContextMenu` instead), no left button
        e.preventDefault()
      }
    }

    window.addEventListener('auxclick', onAuxClick)

    return () => {
      window.removeEventListener('auxclick', onAuxClick)
    }
  }, [])
}

export default useDisableMiddleClick
