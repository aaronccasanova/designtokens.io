import deepmerge from 'deepmerge'

import { spacing } from './token-groups/spacing'
import { colors } from './token-groups/colors'
import { breakpoints } from './token-groups/breakpoints'

import { createDesignTokens } from './utils/creators'

const commonDesignTokens = createDesignTokens({
  breakpoints,
  colors,
  spacing,
})

export const light = deepmerge(
  commonDesignTokens,
  createDesignTokens({
    colors: {
      description: 'Light theme colors.',
      tokens: {
        scheme: {
          description: 'Used to influence default browser styles.',
          value: 'light',
        },
        primary: {
          description: 'Primary theme colors.',
          tokens: {
            main: { value: '{colors.teal.500}' },
          },
        },
        background: {
          description: 'Background colors.',
          tokens: {
            default: { value: '{colors.grey.100}' },
            surface: { value: '{colors.grey.50}' },
          },
        },
        text: {
          description: 'Text colors.',
          tokens: {
            primary: { value: '{colors.grey.900}' },
          },
        },
      },
    },
  }),
)

export type LightTheme = typeof light

export const dark = deepmerge(
  commonDesignTokens,
  createDesignTokens({
    colors: {
      description: 'Dark theme colors.',
      tokens: {
        scheme: {
          description: 'Used to influence default browser styles.',
          value: 'dark',
        },
        primary: {
          description: 'Primary color intention.',
          tokens: {
            main: { value: '{colors.teal.300}' },
          },
        },
        background: {
          description: 'Background colors.',
          tokens: {
            default: { value: '{colors.grey.900}' },
            surface: { value: '{colors.grey.800}' },
          },
        },
        text: {
          description: 'Primary color intention.',
          tokens: {
            primary: { value: '{colors.grey.100}' },
          },
        },
      },
    },
  }),
)

export type DarkTheme = typeof dark

const dimOverrides = createDesignTokens({
  colors: {
    description: 'Dim theme colors',
    tokens: {
      background: {
        description: 'Background colors.',
        tokens: {
          default: { value: '{colors.grey.800}' },
          surface: { value: '{colors.grey.900}' },
        },
      },
    },
  },
})

type DimOverrides = typeof dimOverrides

export const dim = deepmerge<DarkTheme, DimOverrides>(dark, dimOverrides)

export type DimTheme = typeof dim
