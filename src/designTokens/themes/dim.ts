import deepmerge from 'deepmerge'

import { createDesignTokens } from '../utils/creators'
import { darkTheme, DarkTheme } from './dark'

const dimOverrides = createDesignTokens({
  colors: {
    $description: 'Dim theme colors',
    $tokens: {
      background: {
        $description: 'Background colors.',
        $tokens: {
          default: { $value: '{colors.grey.800}' },
          surface: { $value: '{colors.grey.900}' },
        },
      },
    },
  },
})

type DimOverrides = typeof dimOverrides

export const dimTheme = deepmerge<DarkTheme, DimOverrides>(
  darkTheme,
  dimOverrides,
)

export type DimTheme = typeof dimTheme
