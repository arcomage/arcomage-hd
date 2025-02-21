export const changeInputValue = (
  target: HTMLInputElement,
  newValue: string,
) => {
  const nativeInputValueSetter = Object.getOwnPropertyDescriptor(
    window.HTMLInputElement.prototype,
    'value',
  )?.set

  if (nativeInputValueSetter) {
    nativeInputValueSetter.call(target, newValue)

    target.dispatchEvent(new Event('input', { bubbles: true }))
  }
}

export const changeSelectValueByIndex = (
  target: HTMLSelectElement,
  index: number,
) => {
  target.selectedIndex = index
  target.dispatchEvent(new Event('change', { bubbles: true }))
}
