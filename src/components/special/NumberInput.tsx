import React, {
  useEffect,
  useRef,
  useState,
  InputHTMLAttributes,
  useMemo,
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

const _toValidValue = (val: string, max: number, min: number) => {
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
  return num
}

interface NumberInputProps extends InputHTMLAttributes<HTMLInputElement> {
  debounceDelay?: number
  validateFunction?: (val: string, max: number, min: number) => number
}

/**
 * A specialized input component for handling numeric values with built-in validation and debouncing.
 *
 * @component
 * @param {Object} props - Component props, same interface as `InputHTMLAttributes<HTMLInputElement>` which includes all properties of an HTML input element (e.g. `value`, `min`, `max`, `step`, `disabled`, `onChange`, etc. ), plus 2 additional properties:
 * @param {number} [props.debounceDelay=1000] - Decounced delay in milliseconds before the input value is processed, default is 1000ms, set to 0 to disable debouncing
 * @param {Function} [props.validateFunction=_toValidValue] - Custom validation function that receives (value, max, min), for default function, see `_toValidValue` in source code file NumberInput.tsx (simple function that ensures the value is an integer within the range))
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
 *   validateFunction={(val, max, min) => customValidation(val, max, min)}
 * />
 *
 * @returns {JSX.Element} A controlled input component that handles numeric values
 */
export const NumberInput = ({
  debounceDelay = 1000,
  validateFunction = _toValidValue,
  ...props
}: NumberInputProps) => {
  const { value, min, max, step, disabled, onChange, ...rest } = props

  const [inputValue, setInputValue] = useState<string>()

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
    const finalValue = validateFunction(val, _max, _min).toString()
    setInputValue(finalValue)

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
    immediateValidateAndUpdate(value?.toString() ?? '0')
  }, [value])

  useEffect(() => {
    if (inputValue !== undefined) {
      immediateValidateAndUpdate(inputValue)
    }
  }, [_min, _max])

  const debouncedValidateAndUpdate = (val: string, delay: number) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current)
    }
    debounceTimerRef.current = setTimeout(() => {
      debounceTimerRef.current = undefined
      validateAndUpdate(val)
    }, delay)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
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
    const currentVal = validateFunction(inputValue ?? '0', _max, _min)
    const newVal = increment ? currentVal + _step : currentVal - _step
    immediateValidateAndUpdate(newVal.toString())
  }

  return (
    <div
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
    >
      <button
        className="decrease"
        onClick={() => {
          handleButtonClick(false)
        }}
        disabled={disabled || parseFloat(inputValue ?? '0') <= _min}
      >
        −
      </button>
      <input
        ref={inputRef}
        type="text"
        inputMode="numeric"
        value={inputValue?.toString() ?? ''}
        {...(_max !== Number.MAX_SAFE_INTEGER ? { max: _max } : {})}
        {...(_min !== Number.MIN_SAFE_INTEGER ? { min: _min } : {})}
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
      >
        +
      </button>
    </div>
  )
}

export default NumberInput
