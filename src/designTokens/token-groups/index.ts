import { createDesignTokens } from '../utils/creators'

export * from './breakpoints'
export * from './colors'
export * from './spacing'

import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { spacing } from './spacing'

export const tokenGroups = createDesignTokens({
  breakpoints,
  colors,
  spacing,
})

export type TokenGroupKey = keyof typeof tokenGroups

export type TokenGroupKeys = TokenGroupKey[]

export const TokenGroupKeys = Object.keys(tokenGroups) as TokenGroupKeys

export function isTokenGroupKey(
  TokenGroup: unknown,
): TokenGroup is TokenGroupKey {
  return TokenGroupKeys.includes(TokenGroup as TokenGroupKey)
}
