import { spacing } from '../token-groups/spacing'
import { colors } from '../token-groups/colors'
import { breakpoints } from '../token-groups/breakpoints'

import { createDesignTokens } from '../utils/creators'

export const commonTheme = createDesignTokens({
  breakpoints,
  colors,
  spacing,
})
