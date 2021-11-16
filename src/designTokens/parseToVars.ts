import { parseDesignTokens } from './parser'
import type { DesignTokens } from './types'

import { varCreator } from './utils'

const createVar = varCreator('theme')

export const parseToVars = (tokens: DesignTokens) => {
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
