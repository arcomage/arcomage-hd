import { useEffect } from 'react'
import { focusChange } from './focusChange'

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key !== 'Tab') {
    return
  }
  const target = document.activeElement as HTMLElement | null
  if (event.shiftKey) {
    focusChange({
      currentTarget: target,
      indexType: '<',
    })
    event.preventDefault()
  } else if (!event.shiftKey) {
    focusChange({
      currentTarget: target,
    })
    event.preventDefault()
  }
}

const useNewTabIndex = () => {
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useNewTabIndex
