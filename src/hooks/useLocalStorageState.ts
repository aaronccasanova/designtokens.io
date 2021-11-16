/**
 * Adapted from: https://github.com/kentcdodds/react-hooks/blob/984df105901abed6b90da23f754198cfba03ffc7/src/utils.js#L10-L35
 */
import React from 'react'

/**
 *
 * @param key The key to set in localStorage for this value
 * @param defaultValue The value to use if it is not already in localStorage
 * @param options The serialize and deserialize functions to use (defaults to JSON.stringify and JSON.parse respectively)
 */
export function useLocalStorageState<T extends string>(
  key: string,
  defaultValue?: T | (() => T),
  { serialize = JSON.stringify, deserialize = JSON.parse } = {},
) {
  const [state, setState] = React.useState<T>(() => {
    const valueInLocalStorage = window.localStorage.getItem(key)

    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage)
    }

    return typeof defaultValue === 'function'
      ? defaultValue()
      : defaultValue || ''
  })

  const prevKeyRef = React.useRef(key)

  React.useEffect(() => {
    const prevKey = prevKeyRef.current

    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey)
    }

    prevKeyRef.current = key
    window.localStorage.setItem(key, serialize(state))
  }, [key, state, serialize])

  return [state, setState] as const
}
