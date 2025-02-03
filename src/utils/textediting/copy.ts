/**
 * Copy text to clipboard
 * @param text - text to copy
 * @returns Promise<void>
 * @note use navigator.clipboard if available, otherwise use execCommand, otherwise throw error
 */
export const copy = (text: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(text)
        .then(() => resolve())
        .catch((err) => reject(new Error('Clipboard API failed: ' + err)))
    }
    // Fallback to execCommand for older browsers (deprecated)
    else if (
      document.queryCommandSupported &&
      document.queryCommandSupported('copy')
    ) {
      const textArea = document.createElement('textarea')
      textArea.value = text
      textArea.style.position = 'absolute'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      textArea.setSelectionRange(0, text.length)
      try {
        const successful = document.execCommand('copy')
        if (successful) {
          resolve()
        } else {
          reject(new Error('execCommand copy failed'))
        }
      } catch (err) {
        reject(new Error('execCommand failed: ' + err))
      } finally {
        document.body.removeChild(textArea)
      }
    } else {
      reject(new Error('Clipboard API and execCommand not supported'))
    }
  })
}
