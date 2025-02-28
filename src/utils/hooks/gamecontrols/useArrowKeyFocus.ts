import { useEffect } from 'react'
import { isEditable } from '@/utils/textediting/isEditable'
import { focusChange } from './focusChange'

const useArrowKeyFocus = (): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      const { target } = event

      if (
        document.getElementsByClassName('windowbg').length > 0 ||
        isEditable(target as HTMLElement) ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLInputElement && target.type === 'range')
      ) {
        return
      }

      switch (key) {
        case 'ArrowUp': {
          focusChange({
            listType: 'b',
            indexType: '1',
          })
          return
        }
        case 'ArrowDown': {
          focusChange({
            listType: 'c',
            indexType: '1',
          })
          return
        }
        case 'ArrowLeft': {
          focusChange({
            currentTarget: target,
            listType: 'c|b',
            indexType: '<',
          })
          return
        }
        case 'ArrowRight': {
          focusChange({
            currentTarget: target,
            listType: 'c|b',
            indexType: '>',
          })
          return
        }
        default: {
          return
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])
}

export default useArrowKeyFocus
