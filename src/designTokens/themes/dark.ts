import deepmerge from 'deepmerge'

import { createDesignTokens } from '../utils/creators'
import { commonTheme } from './common'

export const darkTheme = deepmerge(
  commonTheme,
  createDesignTokens({
    colors: {
      $description: 'Dark theme colors.',
      $tokens: {
        scheme: {
          $description: 'Used to influence default browser styles.',
          $value: 'dark',
        },
        primary: {
          $description: 'Primary color intention.',
          $tokens: {
            main: { $value: '{colors.teal.300}' },
          },
        },
        background: {
          $description: 'Background colors.',
          $tokens: {
            default: { $value: '{colors.grey.900}' },
            surface: { $value: '{colors.grey.800}' },
          },
        },
        text: {
          $description: 'Primary color intention.',
          $tokens: {
            primary: { $value: '{colors.grey.100}' },
          },
        },
      },
    },
  }),
)

export type DarkTheme = typeof darkTheme
