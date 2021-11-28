import React from 'react'
import {
  defaultThemeKey,
  isThemeKey,
  localStorageThemeKey,
  ThemeKey,
  themeKeys,
  ThemeKeys,
} from '../../designTokens'

export interface ThemePickerContextValue {
  themeKey: ThemeKey
  themeKeys: ThemeKeys
  setThemeKey: (theme: ThemeKey) => void
}

export const ThemePickerContext = React.createContext<ThemePickerContextValue>({
  themeKey: defaultThemeKey,
  themeKeys,
  setThemeKey: () => {},
})

export function useThemePicker() {
  const context = React.useContext(ThemePickerContext)

  if (context === undefined) {
    throw new Error('useThemePicker must be used within a ThemePickerContext')
  }

  return context
}

export interface ThemePickerProviderProps {
  children: React.ReactNode
}

export function ThemePickerProvider(props: ThemePickerProviderProps) {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>(defaultThemeKey)

  React.useEffect(() => {
    const storedTheme = localStorage.getItem(localStorageThemeKey)

    if (!storedTheme || !isThemeKey(storedTheme)) {
      const newThemeKey = matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'

      setThemeKey(newThemeKey)

      localStorage.setItem(localStorageThemeKey, newThemeKey)
    } else {
      setThemeKey(storedTheme)
    }
  }, [])

  function handleSetTheme(newThemeKey: ThemeKey) {
    if (isThemeKey(newThemeKey)) {
      setThemeKey(newThemeKey)

      try {
        localStorage.setItem(localStorageThemeKey, newThemeKey)
      } catch (e) {
        console.warn(
          `Failed to set "${localStorageThemeKey}" in local storage.`,
        )
      }
    }
  }

  return (
    <ThemePickerContext.Provider
      value={{
        themeKey,
        themeKeys,
        setThemeKey: handleSetTheme,
      }}
    >
      {props.children}
    </ThemePickerContext.Provider>
  )
}
