import React from 'react'
import styled from 'styled-components'

import { parseToVars, DesignTokens, themes } from '../../designTokens'

const Component = styled.div<{ tokens: DesignTokens }>`
  ${(props) => parseToVars(props.tokens)}

  color-scheme: var(--theme-colors-scheme);
`

export interface ThemeProviderProps {
  as?: React.ElementType
  children: React.ReactNode
  className?: string
  theme?: DesignTokens
}

export function ThemeProvider(props: ThemeProviderProps) {
  const { as, theme = themes.dark, children, className } = props

  return (
    <Component as={as} tokens={theme} className={className}>
      {children}
    </Component>
  )
}
