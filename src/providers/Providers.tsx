import React from 'react'

import { RootThemeProvider } from './RootThemeProvider'

export const Providers: React.FC = (props) => {
  return <RootThemeProvider>{props.children}</RootThemeProvider>
}
