import { isEditable } from '@/utils/textediting/isEditable'
import { simulateArrowKey } from '@/utils/textediting/simulateArrowKey'
import { focusChange } from './focusChange'
import { GamepadButtonType } from './useGamepad'

const contextmenuEvent = new MouseEvent('contextmenu', {
  bubbles: true,
  cancelable: true,
  view: window,
})

const upKeyDownEvent = new KeyboardEvent('keydown', {
  key: 'ArrowUp',
  code: 'ArrowUp',
  keyCode: 38,
  bubbles: true,
  cancelable: true,
})

const downKeyDownEvent = new KeyboardEvent('keydown', {
  key: 'ArrowDown',
  code: 'ArrowDown',
  keyCode: 40,
  bubbles: true,
  cancelable: true,
})

export const handleGamepadButtonDown = (button: GamepadButtonType) => {
  const target = document.activeElement as HTMLElement | null
  switch (button.name) {
    case 'A': {
      target?.click()
      return
    }
    case 'B': {
      const cancelButton = document.querySelector(
        'button.cancel',
      ) as HTMLElement
      if (target && target.classList.contains('card')) {
        target.dispatchEvent(contextmenuEvent)
      }
      if (cancelButton) {
        cancelButton.click()
      }
      return
    }
    case 'X': {
      focusChange({
        currentTarget: target,
        listType: 'c',
        indexType: '<',
      })
      return
    }
    case 'Y': {
      focusChange({
        currentTarget: target,
        listType: 'c',
        indexType: '>',
      })
      return
    }
    case 'LB': {
      focusChange({
        currentTarget: target,
        indexType: '<',
      })
      return
    }
    case 'RB': {
      focusChange({
        currentTarget: target,
        indexType: '>',
      })
      return
    }
    case 'LT': {
      return
    }
    case 'RT': {
      return
    }
    case 'BACK': {
      return
    }
    case 'START': {
      ;(document.querySelector("[accesskey='s']") as HTMLElement)?.click()
      return
    }
    case 'LSCLICK': {
      return
    }
    case 'RSCLICK': {
      return
    }
    case 'UP': {
      // TODO (minor) handle long click
      if (
        isEditable(target) ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLInputElement && target.type === 'range')
      ) {
        simulateArrowKey('up', target)
        target.dispatchEvent(upKeyDownEvent)
      } else if (
        target instanceof HTMLButtonElement &&
        (target.classList.contains('increase') ||
          target.classList.contains('decrease'))
      ) {
        const _target = target.parentNode?.querySelector(
          'input.number-input-field',
        ) as HTMLInputElement
        _target.dispatchEvent(upKeyDownEvent)
      } else if (document.getElementsByClassName('window-bg').length === 0) {
        focusChange({
          listType: 'b',
          indexType: '1',
        })
      }
      return
    }
    case 'DOWN': {
      // TODO (minor) handle long click
      if (
        isEditable(target) ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLInputElement && target.type === 'range')
      ) {
        simulateArrowKey('down', target)
        target.dispatchEvent(downKeyDownEvent)
      } else if (
        target instanceof HTMLButtonElement &&
        (target.classList.contains('increase') ||
          target.classList.contains('decrease'))
      ) {
        const _target = target.parentNode?.querySelector(
          'input.number-input-field',
        ) as HTMLInputElement
        _target.dispatchEvent(downKeyDownEvent)
      } else if (document.getElementsByClassName('window-bg').length === 0) {
        focusChange({
          listType: 'c',
          indexType: '1',
        })
      }
      return
    }
    case 'LEFT': {
      // TODO (minor) handle long click
      if (
        isEditable(target) ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLInputElement && target.type === 'range')
      ) {
        simulateArrowKey('left', target)
      } else if (document.getElementsByClassName('window-bg').length === 0) {
        focusChange({
          currentTarget: target,
          listType: 'c|b',
          indexType: '<',
        })
      }
      return
    }
    case 'RIGHT': {
      // TODO (minor) handle long click
      if (
        isEditable(target) ||
        target instanceof HTMLSelectElement ||
        (target instanceof HTMLInputElement && target.type === 'range')
      ) {
        simulateArrowKey('right', target)
      } else if (document.getElementsByClassName('window-bg').length === 0) {
        focusChange({
          currentTarget: target,
          listType: 'c|b',
          indexType: '>',
        })
      }
      return
    }
    case 'GUIDE': {
      return
    }
    default: {
      return
    }
  }
}
