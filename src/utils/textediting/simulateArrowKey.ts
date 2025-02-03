import { changeInputValue, changeSelectValueByIndex } from './changeFormElValue'
import { isEditable } from './isEditable'

// TODO add unit test

/**
 * Simulate arrow key press on the target element
 * @param direction - direction of the arrow key
 * @param target - target element
 * @note it supports only HTMLInputElement of text, number, email, tel, password, range types, HTMLTextAreaElement, and HTMLSelectElement
 */
export const simulateArrowKey = (
  direction: 'up' | 'down' | 'left' | 'right',
  target: HTMLElement | null,
): void => {
  if (!target) {
    return
  }

  if (isEditable(target)) {
    let { selectionStart, selectionEnd } = target
    const { value } = target

    if (selectionStart === null) {
      selectionStart = 0
    }
    if (selectionEnd === null) {
      selectionEnd = value.length
    }

    if (selectionStart === selectionEnd) {
      if (direction === 'left' && selectionStart > 0) {
        target.setSelectionRange(selectionStart - 1, selectionEnd - 1)
      } else if (direction === 'right' && selectionEnd < value.length) {
        target.setSelectionRange(selectionStart + 1, selectionEnd + 1)
      }
    } else {
      if (direction === 'left' && selectionStart >= 0) {
        target.setSelectionRange(selectionStart, selectionStart)
      } else if (direction === 'right' && selectionEnd <= value.length) {
        target.setSelectionRange(selectionEnd, selectionEnd)
      }
    }
  }

  if (target instanceof HTMLSelectElement) {
    const options = Array.from(target.options)
    const selectedIndex = target.selectedIndex

    if ((direction === 'up' || direction === 'left') && selectedIndex > 0) {
      changeSelectValueByIndex(target, selectedIndex - 1)
    } else if (
      (direction === 'down' || direction === 'right') &&
      selectedIndex < options.length - 1
    ) {
      changeSelectValueByIndex(target, selectedIndex + 1)
    }
  }

  if (target instanceof HTMLInputElement && target.type === 'range') {
    let newValue = parseFloat(target.value)
    const min = parseFloat(target.min)
    const max = parseFloat(target.max)
    const step = parseFloat(target.step) || 1

    if (direction === 'left' || direction === 'down') {
      newValue = Math.max(newValue - step, min)
    } else if (direction === 'right' || direction === 'up') {
      newValue = Math.min(newValue + step, max)
    }

    target.value = newValue.toString()

    changeInputValue(target, newValue.toString())
  }
}
