import deepmerge from 'deepmerge'
import { color } from './color'

import { DesignTokens } from './types'

export const light: DesignTokens = deepmerge(color, {
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

export const dark: DesignTokens = deepmerge(color, {
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
        },
      },
    },
  },
})
