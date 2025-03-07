import devLog from '@/utils/devLog'
import { isEditable } from './isEditable'

/**
 * Get the clipboard text
 * @returns Promise<string>
 * @note use navigator.clipboard if available (the browser will prompt the user for permission), otherwise use execCommand, otherwise throw error
 */
// const readClipboardText = async (): Promise<string> => {
//   if (navigator.clipboard) {
//     try {
//       const text = await navigator.clipboard.readText()
//       return text
//     } catch (err) {
//       throw new Error('Clipboard API read failed: ' + err)
//     }
//   } else if (
//     document.queryCommandSupported &&
//     document.queryCommandSupported('paste')
//   ) {
//     // Fallback to execCommand for older browsers
//     const textArea = document.createElement('textarea')
//     textArea.style.position = 'absolute'
//     textArea.style.opacity = '0'
//     document.body.appendChild(textArea)

//     textArea.focus()
//     try {
//       const successful = document.execCommand('paste')
//       if (successful) {
//         const clipboardText = textArea.value
//         document.body.removeChild(textArea)
//         return clipboardText
//       } else {
//         throw new Error('execCommand paste failed')
//       }
//     } catch (err) {
//       document.body.removeChild(textArea)
//       throw new Error('execCommand paste failed: ' + err)
//     }
//   } else {
//     throw new Error('Clipboard API and execCommand paste not supported')
//   }
// }

/**
 * Paste text into the target element
 * @param target - target element
 * @returns Promise<void>
 * @note it supports only HTMLInputElement | HTMLTextAreaElement
 */
export const paste = async (target: HTMLElement | null): Promise<void> => {
  if (!isEditable(target)) {
    return
  }
  try {
    const clipboardText = await navigator.clipboard.readText()

    const start = target.selectionStart
    const end = target.selectionEnd

    if (clipboardText === null) {
      return
    }

    if (start === null || end === null) {
      target.value = clipboardText
      const newCursorPos = clipboardText.length
      target.setSelectionRange(newCursorPos, newCursorPos)
      return
    }

    target.value =
      target.value.substring(0, start) +
      clipboardText +
      target.value.substring(end)
    const newCursorPos = start + clipboardText.length
    target.setSelectionRange(newCursorPos, newCursorPos)
  } catch (error) {
    devLog(`Clipboard access denied: ${error}`, 'error')
  }
}
