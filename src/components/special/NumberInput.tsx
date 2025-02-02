import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useMemo,
  forwardRef,
} from 'react'

const _toValidMaxMin = (
  val: string | number | undefined,
  defaultValue: number,
) => {
  if (val === undefined) {
    return defaultValue
  }
  const num = parseFloat(val.toString())
  if (isNaN(num)) {
    return defaultValue
  }
  return num
}

const _toValidStep = (val: string | number | undefined) => {
  return parseFloat(val?.toString() ?? 'NaN') > 0
    ? parseFloat(val as string)
    : 1
}

const defaultSanitize = (val: string) => val.replace(/[^0-9-]/g, '')

const defaultValidate = (val: string, max: number, min: number) => {
  let num = parseInt(val)
  if (isNaN(num)) {
    num = 0
  }
  if (num < min) {
    num = min
  }
  if (num > max) {
    num = max
  }
  return num.toString()
}

type NumberInputProps = InputHTMLAttributes<HTMLInputElement> & {
  debounceDelay?: number
  validate?: (val: string, max: number, min: number) => string
  sanitize?: (val: string, max: number, min: number) => string
}

/**
 * A specialized input component for handling numeric values with built-in validation and debouncing.
 *
 * @component
 * @note component's props have same interface as `InputHTMLAttributes<HTMLInputElement>` which includes all properties of an HTML input element (e.g. `value`, `min`, `max`, `step`, `disabled`, `onChange`, etc. ), plus 2 additional properties:
 * @param {number} [debounceDelay=1000] - Decouncing delay in milliseconds before the input value is processed, default is 1000ms, set to 0 to disable debouncing
 * @param {Function} [validate=defaultValidate] - Custom validation function to run after debouncing. It receives (value, max, min). For default function, see `defaultValidate` in source code file NumberInput.tsx (simple function that ensures the value is an integer within the range))
 * @param {Function} [sanitize=defaultSanitize] - Custom sanitization function to run immediately after user types anything, any before debouncing. It receives (value, max, min). For default function, see `defaultSanitize` in source code file NumberInput.tsx (simple function that ensures the value is an integer))
 * @returns {JSX.Element} A controlled input component that handles numeric values
 *
 * @note `props.onChange`'s `event` argument also has the same interface as `event` in `React.ChangeEvent<HTMLInputElement>`, with `event.target` being the input element which is slightly different: it is now an input element with `type="text" inputMode="numeric"` instead of `type="number"`.
 *
 * @example
 * <NumberInput
 *   max={11}
 *   min={-4}
 *   step={2}
 *   disabled={false}
 *   onChange={(e) => handleChange(e)}
 *   debounceDelay={900}
 *   validate={(val, max, min) => customValidation(val, max, min)}
 *   sanitize={(val, max, min) => customSanitization(val, max, min)}
 * />
 *
 * @returns {JSX.Element} A controlled input component that handles numeric values
 */
const NumberInput = ({
  debounceDelay = 1000,
  validate = defaultValidate,
  sanitize = defaultSanitize,
  ...props
  // TODO: add `ref` (for parent component tooltip) (note that forwardRef may cause issue of onChange not triggered)
}: NumberInputProps) => {
  const { value, min, max, step, disabled, onChange, ...rest } = props

  const [inputValue, setInputValue] = useState<string>()
  const [hasError, setHasError] = useState<boolean>(false)

  const oldInputValueRef = useRef<string>()

  const debounceTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const _max = useMemo(() => {
    return _toValidMaxMin(max, Number.MAX_SAFE_INTEGER)
  }, [max])
  const _min = useMemo(() => {
    return _toValidMaxMin(min, Number.MIN_SAFE_INTEGER)
  }, [min])
  const _step = useMemo(() => {
    return _toValidStep(step)
  }, [step])

  const inputRef = useRef<HTMLInputElement>(null)

  const validateAndUpdate = (val: string) => {
    const finalValue = validate(val, _max, _min).toString()
    setInputValue(finalValue)
    setHasError(false)

    if (
      debounceTimerRef.current === undefined &&
      oldInputValueRef.current !== undefined &&
      finalValue !== oldInputValueRef.current &&
      onChange &&
      inputRef.current
    ) {
      inputRef.current.value = finalValue
      const e = {
        target: inputRef.current,
      } as React.ChangeEvent<HTMLInputElement>
      onChange(e)
    }
    oldInputValueRef.current = finalValue
  }

  const immediateValidateAndUpdate = (val: string) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = undefined
    validateAndUpdate(val)
  }

  useEffect(() => {
    if (value !== undefined) {
      immediateValidateAndUpdate(value?.toString() ?? '0')
    }
  }, [value, _min, _max])

  const debouncedValidateAndUpdate = (val: string, delay: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = undefined
      validateAndUpdate(val)
    }, delay)
  }

  useEffect(() => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
  }, [])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = sanitize(e.target.value, _max, _min)
    if (validate(val, _max, _min) !== val) {
      setHasError(true)
    }
    if (debounceDelay > 0) {
      setInputValue(val)
      debouncedValidateAndUpdate(val, debounceDelay)
    } else {
      immediateValidateAndUpdate(val ?? '0')
    }
  }

  const handleBlur = () => {
    immediateValidateAndUpdate(inputValue ?? '0')
  }

  const handleButtonClick = (increment: boolean) => {
    if (inputRef && 'current' in inputRef && inputRef.current) {
      inputRef.current.focus()
    }
    const currentVal = parseFloat(validate(inputValue ?? '0', _max, _min))
    const newVal = increment ? currentVal + _step : currentVal - _step
    immediateValidateAndUpdate(newVal.toString())
  }

  return (
    <div
      role="textbox"
      tabIndex={-1}
      className="number-input"
      onWheel={(e) => {
        if (disabled) {
          return
        }
        if (e.deltaY < 0) {
          handleButtonClick(true)
        } else {
          handleButtonClick(false)
        }
      }}
      onKeyDown={(e) => {
        if (disabled) {
          return
        }
        if (e.key === 'ArrowUp') {
          e.preventDefault()
          handleButtonClick(true)
        } else if (e.key === 'ArrowDown') {
          e.preventDefault()
          handleButtonClick(false)
        }
      }}
    >
      <button
        className="decrease"
        onClick={() => {
          handleButtonClick(false)
        }}
        disabled={disabled || parseFloat(inputValue ?? '0') <= _min}
        tabIndex={-1}
      >
        −
      </button>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={inputValue?.toString() ?? ''}
        {...(_max !== Number.MAX_SAFE_INTEGER
          ? { max: _max, 'aria-valuemax': _max }
          : {})}
        {...(_min !== Number.MIN_SAFE_INTEGER
          ? { min: _min, 'aria-valuemin': _min }
          : {})}
        aria-invalid={hasError}
        step={_step}
        onChange={handleInputChange}
        onBlur={handleBlur}
        autoComplete="off"
        autoCorrect="off"
        spellCheck="false"
        role="spinbutton"
        disabled={disabled}
        {...rest}
        className="number-input-field"
      />
      <button
        className="increase"
        onClick={() => {
          handleButtonClick(true)
        }}
        disabled={disabled || parseFloat(inputValue ?? '0') >= _max}
        tabIndex={-1}
      >
        +
      </button>
    </div>
  )
}

NumberInput.displayName = 'NumberInput'
export default NumberInput
