import React from 'react'

import { ThemeProvider as BaseThemeProvider } from './ThemeProvider'
import { RootThemeProvider } from './RootThemeProvider'
import { ThemePickerProvider, useThemePicker } from './ThemePickerProvider'
import { themes } from '../designTokens'

const ThemeProvider: React.FC = (props) => {
  const { themeKey } = useThemePicker()

  return (
    <BaseThemeProvider theme={themes[themeKey]}>
      {props.children}
    </BaseThemeProvider>
  )
}

export const Providers: React.FC = (props) => {
  return (
    <ThemePickerProvider>
      <RootThemeProvider>{props.children}</RootThemeProvider>
      {/* <ThemeProvider>{props.children}</ThemeProvider> */}
    </ThemePickerProvider>
  )
}
