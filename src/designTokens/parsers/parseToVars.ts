import { parseDesignTokens } from './parser'
import type { DesignTokens, DesignTokenGroup } from '../utils/types'

import { varCreator } from '../utils/utils'

// TODO: Move this inside function and add prefix option
const createVar = varCreator('theme')

export const parseToVars = (tokens: DesignTokens | DesignTokenGroup) => {
  const customProperties: string[] = []

  parseDesignTokens(tokens, {
    onToken: (token, ctx) => {
      customProperties.push(`${createVar(ctx.path)}: ${token.value};`)
    },
    onAlias: (alias, ctx) => {
      const cssVar = createVar(ctx.getAliasPath(alias))
      customProperties.push(`${createVar(ctx.path)}: var(${cssVar});`)
    },
  })

  return customProperties.join('\n')
}
