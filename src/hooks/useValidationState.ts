import { useState } from 'react'

const testEmailRegex =
  /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu

export const validationFuncs = {
  hasValue: (newValue: string): boolean => newValue.length > 0,
  isEmail: (newValue: string): boolean => testEmailRegex.test(newValue),
}

export function useValidationState<T>(
  defaultValue: T,
  validationFunction: (value: T) => boolean,
  defaultValidation?: boolean,
): [[T, (newState: T) => void], boolean] {
  const [state, setState] = useState(defaultValue)
  const [isValid, setIsValid] = useState(!!defaultValidation)

  function setStateOuter(newState: T) {
    setIsValid(validationFunction(newState))
    setState(newState)
  }

  return [[state, setStateOuter], isValid]
}

export function useCustomValidationState<T>(
  defaultValue: T,
  validationFunction: (value: T) => boolean,
  defaultValidation?: boolean,
): [[T, (newState: T, withValidate?: boolean) => void], boolean, () => void] {
  const [state, setState] = useState(defaultValue)
  const [isValid, setIsValid] = useState(!!defaultValidation)

  function setStateOuter(newState: T, withValidate?: boolean) {
    setState(newState)
    if (withValidate) {
      setIsValid(validationFunction(newState))
    }
  }

  return [[state, setStateOuter], isValid, () => setIsValid(validationFunction(state))]
}
