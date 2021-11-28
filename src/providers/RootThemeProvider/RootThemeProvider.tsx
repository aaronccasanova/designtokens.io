import React from 'react'
import {
  defaultThemeKey,
  isThemeKey,
  localStorageThemeKey,
  designTokensThemeClass,
  ThemeKey,
  themeKeys,
  ThemeKeys,
} from '../../designTokens'

export interface RootThemeContextValue {
  themeKey: ThemeKey
  themeKeys: ThemeKeys
  setThemeKey: (theme: ThemeKey) => void
}

export const RootThemeContext = React.createContext<RootThemeContextValue>({
  themeKey: defaultThemeKey,
  themeKeys,
  setThemeKey: () => {},
})

export function useRootTheme() {
  const context = React.useContext(RootThemeContext)

  if (context === undefined) {
    throw new Error('useRootTheme must be used within a ThemePickerContext')
  }

  return context
}

export interface RootThemeProviderProps {
  children: React.ReactNode
}

export function RootThemeProvider(props: RootThemeProviderProps) {
  const [themeKey, setThemeKey] = React.useState<ThemeKey>(defaultThemeKey)

  React.useEffect(() => {
    const root = window.document.documentElement

    const initialThemeKey = root.style.getPropertyValue('--initial-theme')

    console.log('initialThemeKey:', initialThemeKey)

    if (isThemeKey(initialThemeKey)) {
      setThemeKey(initialThemeKey)
    }
  }, [])

  const handleSetThemeKey = (newThemeKey: ThemeKey) => {
    if (!isThemeKey(newThemeKey)) return

    const root = window.document.documentElement

    root.classList.replace(
      `${designTokensThemeClass}-${themeKey}`,
      `${designTokensThemeClass}-${newThemeKey}`,
    )

    setThemeKey(newThemeKey)

    localStorage.setItem(localStorageThemeKey, newThemeKey)
  }

  return (
    <RootThemeContext.Provider
      value={{
        themeKey,
        themeKeys,
        setThemeKey: handleSetThemeKey,
      }}
    >
      {props.children}
    </RootThemeContext.Provider>
  )
}
