/**
 * Checks if the given element is editable
 * @param element
 * @returns boolean
 * @note it checks only HTMLInputElement | HTMLTextAreaElement, and does not check if other element is editable
 * @note this function is a type guard
 */
export const isEditable = (
  element: HTMLElement | null,
): element is HTMLInputElement | HTMLTextAreaElement => {
  if (
    element instanceof HTMLInputElement ||
    element instanceof HTMLTextAreaElement
  ) {
    const editableTypes = ['text', 'number', 'email', 'tel', 'password']
    return (
      editableTypes.includes(element.type) &&
      !element.readOnly &&
      !element.disabled
    )
  }
  return false
  // it does not deal with the following cases currently
  // because they are not used in Arcomage HD
  // if (element.isContentEditable) {
  //   return true
  // }
  // return document.designMode === 'on'
}
