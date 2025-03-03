import { useEffect } from 'react'
import { focusChange } from '@/utils/hooks/gamecontrols/focusChange'

const useArrowKeyFocus = (): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const { key } = event
      const { target } = event

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
