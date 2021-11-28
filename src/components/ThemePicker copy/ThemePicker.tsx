import React from 'react'
import styled from 'styled-components'
import { ThemeKey } from '../../designTokens'
import { useThemePicker } from '../../providers'

const Root = styled('span')({
  display: 'inline-block',
  // margin: 8,
  padding: '0 8px',
  border: `1px solid var(--theme-color-text-primary)`,
  backgroundColor: 'var(--theme-color-background-surface)',
  ':focus-within': {
    border: `1px solid var(--theme-color-primary-main)`,
    outline: `1px solid var(--theme-color-primary-main)`,
  },
})

const Select = styled('select')({
  fontSize: 20,
  padding: '8px 0px',
  color: 'var(--theme-color-text-primary)',
  textTransform: 'capitalize',
  backgroundColor: 'transparent',
  outline: 'none', // Focus styles handled in the root selector
  border: 'none', // Border styles handled in the root selector
})

const Option = styled('option')({
  fontSize: 20,
  padding: '8px 0px',
  color: 'var(--theme-color-text-primary)',
  textTransform: 'capitalize',
  backgroundColor: 'transparent',
  outline: 'none', // Focus styles handled in the root selector
  border: 'none', // Border styles handled in the root selector
})

export interface ThemePickerProps {
  className?: string
}

export const ThemePicker = (props: ThemePickerProps) => {
  const { themeKey, themeKeys, setThemeKey } = useThemePicker()

  return (
    <Root {...props}>
      <Select
        value={themeKey}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setThemeKey(e.target.value as ThemeKey)
        }
      >
        {themeKeys?.map((theme) => (
          <Option key={theme} value={theme}>
            {theme}&nbsp;
          </Option>
        ))}
      </Select>
    </Root>
  )
}
