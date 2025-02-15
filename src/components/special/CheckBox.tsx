import React, { forwardRef } from 'react'

type CheckBoxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, 'type'>

/**
 * CheckBox component (Enter key can toggle the checkbox)
 *
 * @component
 * @param {CheckBoxProps} props - Props for the CheckBox component (including `onKeyDown` that functions as usual)
 * @param {React.Ref<HTMLInputElement>} ref - Ref for the input element
 * @returns {JSX.Element} - CheckBox component
 *
 * @note Natively, only Space key can toggle the checkbox, now Enter key can do it too
 */
const CheckBox = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ onKeyDown, ...props }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter') {
        ;(e.target as HTMLInputElement).click()
      }
      if (onKeyDown) {
        onKeyDown(e)
      }
    }
    return (
      <input type="checkbox" {...props} onKeyDown={handleKeyDown} ref={ref} />
    )
  },
)

CheckBox.displayName = 'CheckBox'

export default CheckBox
