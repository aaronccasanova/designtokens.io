import deepmerge from 'deepmerge'

import { createDesignTokens } from '../utils/creators'
import { commonTheme } from './common'

export const lightTheme = deepmerge(
  commonTheme,
  createDesignTokens({
    colors: {
      $description: 'Light theme colors.',
      $tokens: {
        scheme: {
          $description: 'Used to influence default browser styles.',
          $value: 'light',
        },
        primary: {
          $description: 'Primary theme colors.',
          $tokens: {
            main: { $value: '{colors.teal.500}' },
          },
        },
        background: {
          $description: 'Background colors.',
          $tokens: {
            default: { $value: '{colors.grey.100}' },
            surface: { $value: '{colors.grey.50}' },
          },
        },
        text: {
          $description: 'Text colors.',
          $tokens: {
            primary: { $value: '{colors.grey.900}' },
          },
        },
      },
    },
  }),
)

export type LightTheme = typeof lightTheme
