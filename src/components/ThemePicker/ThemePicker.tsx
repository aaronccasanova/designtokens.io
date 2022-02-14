import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeKey } from '../../designTokens'
import { useRootTheme } from '../../providers'

const Root = styled.span`
  display: inline-block;
  padding: 0 8px;
  border: 1px solid var(--theme-colors-text-primary);
  background-color: var(--theme-colors-background-surface);

  &:focus-within {
    border: 1px solid var(--theme-colors-primary-main);
    outline: 1px solid var(--theme-colors-primary-main);
  }
`

const commonStyles = css`
  font-size: 20px;
  padding: 8px 0px;
  color: var(--theme-colors-text-primary);
  text-transform: capitalize;
  background-color: transparent;

  /* Focus styles handled in the root selector */
  outline: none;
  /* Border styles handled in the root selector */
  border: none;
`

const Select = styled.select`
  ${commonStyles}
`

const Option = styled.option`
  ${commonStyles}
`

export interface ThemePickerProps {
  className?: string
}

export const ThemePicker = (props: ThemePickerProps) => {
  const { themeKey, themeKeys, setThemeKey } = useRootTheme()

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
