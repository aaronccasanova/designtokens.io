import { themes } from '../themes'

// TODO: Move below to themes/index.ts
export type ThemeKey = keyof typeof themes

export type ThemeKeys = ThemeKey[]

export const defaultThemeKey: ThemeKey = 'dark'

export const themeKeys = Object.keys(themes) as ThemeKeys

export function isThemeKey(
  theme: string | null | undefined,
): theme is ThemeKey {
  return themeKeys.includes(theme as ThemeKey)
}

export const rootThemeClass = 'design-tokens-io-theme'

export const localStorageThemeKey = 'design-tokens-io-theme'

/**
 * Type representing both a Design Token and Design Token Alias Properties.
 *
 * Design Token: https://design-tokens.github.io/community-group/format/#design-token
 * Design Token Alias: https://design-tokens.github.io/community-group/format/#alias-reference
 */
export interface DesignTokenProperties {
  $type?: string
  $description?: string
  $metadata?: unknown
  $extensions?: unknown
}

export interface DesignToken extends DesignTokenProperties {
  $value: string | number
}

export interface DesignTokenAlias extends DesignTokenProperties {
  $value: string
}

/**
 * Design Token Group: https://design-tokens.github.io/community-group/format/#groups-0
 */
export interface DesignTokenGroup {
  $description?: string
  // This discriminate `$tokens` property allows TypeScript to statically validate
  // whether or not the current token is a DesignToken or DesignTokenGroup.
  // Note: This is the only place we deviate from the Design Tokens Format Module.
  $tokens: {
    [tokenOrGroupName: string]:
      | DesignToken
      | DesignTokenAlias
      | DesignTokenGroup
  }
}

export type AllDesignTokens = DesignToken | DesignTokenAlias | DesignTokenGroup

/** Root Design Tokens Type */
export type DesignTokens = {
  [tokenOrGroupName: string]: AllDesignTokens
}
