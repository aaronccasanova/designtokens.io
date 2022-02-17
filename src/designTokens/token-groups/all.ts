import { createDesignTokens } from '../utils/creators'
import { breakpoints } from './breakpoints'
import { colors } from './colors'
import { spacing } from './spacing'

export const all = createDesignTokens({
  breakpoints,
  colors,
  spacing,
})
