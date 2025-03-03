import { useEffect } from 'react'
import { focusChange } from './focusChange'

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key !== 'Tab') {
    return
  }
  const target = document.activeElement as HTMLElement | null
  if (event.shiftKey) {
    const isJump = focusChange({
      currentTarget: target,
      listType: 'all+',
      indexType: '<',
    })
    if (!isJump) {
      event.preventDefault()
    }
  } else if (!event.shiftKey) {
    const isJump = focusChange({
      currentTarget: target,
      listType: 'all+',
    })
    if (!isJump) {
      event.preventDefault()
    }
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
