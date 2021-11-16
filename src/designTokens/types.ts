/**
 * Type representing both a Design Token and Design Token Alias Properties.
 *
 * Design Token: https://design-tokens.github.io/community-group/format/#design-token
 * Design Token Alias: https://design-tokens.github.io/community-group/format/#alias-reference
 */
export interface DesignTokenProperties {
  type?: string
  description?: string
  metadata?: unknown
  extensions?: unknown
}

export interface DesignToken extends DesignTokenProperties {
  value: string | number
}

export interface DesignTokenAlias extends DesignTokenProperties {
  value: string
}

/**
 * Design Token Group: https://design-tokens.github.io/community-group/format/#groups-0
 */
export interface DesignTokenGroup {
  description?: string
  // This discriminate `tokens` property allows TypeScript to statically validate
  // whether or not the current token is a DesignToken or DesignTokenGroup.
  tokens: {
    [tokenOrGroupName: string]:
      | DesignToken
      | DesignTokenAlias
      | DesignTokenGroup
  }
}

/** Root Design Tokens Type */
export type DesignTokens = {
  [tokenOrGroupName: string]: DesignToken | DesignTokenAlias | DesignTokenGroup
}
