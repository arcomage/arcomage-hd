import { useEffect } from 'react'
import { focusChange } from './focusChange'

const useArrowKeyFocus = (): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      const { target } = event

      if (
        document.getElementsByClassName('window-bg').length > 0 ||
        target instanceof HTMLInputElement ||
        target instanceof HTMLTextAreaElement
      ) {
        return
      }

      if (key === 'ArrowDown') {
        focusChange({
          listType: 'c',
          indexType: '0',
        })
      } else if (key === 'ArrowUp') {
        focusChange({
          listType: 'b',
          indexType: '0',
        })
      } else if (key === 'ArrowLeft') {
        focusChange({
          currentTarget: target,
          listType: 'c|b',
          indexType: '<',
        })
      } else if (key === 'ArrowRight') {
        focusChange({
          currentTarget: target,
          listType: 'c|b',
          indexType: '>',
        })
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useArrowKeyFocus
