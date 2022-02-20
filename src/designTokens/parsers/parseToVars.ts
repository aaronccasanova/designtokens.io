import { parseDesignTokens } from './parser'
import type { DesignTokens, DesignTokenGroup } from '../utils/types'

import { varCreator } from './utils'

export type ParseToVarsFormat = 'css'

export interface ParseToVarsOptions {
  prefix?: string
}

export const parseToVars = (
  tokens: DesignTokens | DesignTokenGroup,
  options: ParseToVarsOptions = {},
) => {
  const createVar = varCreator(options.prefix || '')
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
