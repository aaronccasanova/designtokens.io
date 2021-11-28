import React from 'react'
import styled, { css } from 'styled-components'
import { ThemeKey } from '../../designTokens'
import { useRootTheme } from '../../providers'
import { useSsr } from '../../hooks'

const Root = styled.span`
  display: inline-block;
  padding: 0 8px;
  border: 1px solid var(--theme-color-text-primary);
  background-color: var(--theme-color-background-surface);

  &:focus-within {
    border: 1px solid var(--theme-color-primary-main);
    outline: 1px solid var(--theme-color-primary-main);
  }
`

const commonStyles = css`
  font-size: 20px;
  padding: 8px 0px;
  color: var(--theme-color-text-primary);
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

const Placeholder = styled.span`
  ${commonStyles}

  display: inline-block;
  padding: 8px;
`

export interface ThemePickerProps {
  className?: string
}

export const ThemePicker = (props: ThemePickerProps) => {
  const { isServer } = useSsr()
  const { themeKey, themeKeys, setThemeKey } = useRootTheme()

  return (
    <Root {...props}>
      {isServer ? (
        <Placeholder>Theme</Placeholder>
      ) : (
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
      )}
    </Root>
  )
}
