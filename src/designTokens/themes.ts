import deepmerge from 'deepmerge'

import { spacing } from './spacing'
import { color } from './color'
import { breakpoints } from './breakpoints'

import { DesignTokens } from './types'

const common: DesignTokens = {
  ...breakpoints,
  ...color,
  ...spacing,
}

export const light: DesignTokens = deepmerge(common, {
  color: {
    description: 'Light theme colors.',
    tokens: {
      scheme: {
        description: 'Used to influence default browser styles.',
        value: 'light',
      },
      primary: {
        description: 'Primary theme colors.',
        tokens: {
          main: { value: '{color.teal.500}' },
        },
      },
      background: {
        description: 'Background colors.',
        tokens: {
          default: { value: '{color.grey.100}' },
          surface: { value: '{color.grey.50}' },
        },
      },
      text: {
        description: 'Text colors.',
        tokens: {
          primary: { value: '{color.grey.900}' },
        },
      },
    },
  },
})

export const dark: DesignTokens = deepmerge(common, {
  color: {
    description: 'Dark theme colors.',
    tokens: {
      scheme: {
        description: 'Used to influence default browser styles.',
        value: 'dark',
      },
      primary: {
        description: 'Primary color intention.',
        tokens: {
          main: { value: '{color.teal.300}' },
        },
      },
      background: {
        description: 'Background colors.',
        tokens: {
          default: { value: '{color.grey.900}' },
          surface: { value: '{color.grey.800}' },
        },
      },
      text: {
        description: 'Primary color intention.',
        tokens: {
          primary: { value: '{color.grey.100}' },
        },
      },
    },
  },
})

export const dim: DesignTokens = deepmerge(dark, {
  color: {
    description: 'Dim theme colors',
    tokens: {
      background: {
        description: 'Background colors.',
        tokens: {
          default: { value: '{color.grey.800}' },
          surface: { value: '{color.grey.900}' },
        },
      },
    },
  },
})
