import traverse from 'traverse'
import type {
  DesignTokens,
  DesignToken,
  DesignTokenAlias,
  DesignTokenGroup,
} from './types'

interface ParseDesignTokenOptions {
  onToken?: (token: DesignToken, context: ParseContext) => void
  onAlias?: (alias: DesignTokenAlias, context: ParseContext) => void
  onGroup?: (group: DesignTokenGroup, context: ParseContext) => void
}

export function parseDesignTokens(
  designTokens: DesignTokens,
  options: ParseDesignTokenOptions,
): void {
  // Note: the `forEach` callback must be a function declaration
  // to allow `this` to be bound to the traversal context.
  traverse(designTokens).forEach(function (node) {
    const traverseContext: traverse.TraverseContext = this

    if (isDesignToken(node)) {
      if (isAliasToken(node)) {
        const aliasToken = node

        options?.onAlias?.(
          aliasToken,
          createContext({ designTokens, traverseContext }),
        )
      } else {
        const designToken = node

        options?.onToken?.(
          designToken,
          createContext({ designTokens, traverseContext }),
        )
      }
    } else if (isTokenGroup(node)) {
      const tokenGroup = node as DesignTokenGroup

      options?.onGroup?.(
        tokenGroup,
        createContext({ designTokens, traverseContext }),
      )
    }
  })
}

export function isDesignToken(
  tokenOrGroup: DesignToken | DesignTokenAlias | DesignTokenGroup,
): tokenOrGroup is DesignToken {
  return Boolean((tokenOrGroup as DesignToken)?.value)
}

export function isAliasToken(
  tokenOrGroup: DesignToken | DesignTokenAlias | DesignTokenGroup,
): tokenOrGroup is DesignTokenAlias {
  if (isDesignToken(tokenOrGroup)) {
    const value = tokenOrGroup.value
    return typeof value === 'string' && value.startsWith('{')
  }

  return false
}

export function isTokenGroup(
  tokenOrGroup: DesignToken | DesignTokenAlias | DesignTokenGroup,
): tokenOrGroup is DesignTokenGroup {
  return Boolean((tokenOrGroup as DesignTokenGroup)?.tokens)
}

interface ParseContext {
  /**
   * Path of the current token.
   *
   * Note: This path has been filtered to exclude the `tokens` property.
   * Helpful for composing token names such as CSS custom properties.
   */
  path: string[]
  /**
   * Raw path of the current token.
   *
   * Note: This path has not been filtered and contains the full path to
   * the current token from the root of the design tokens object.
   * Helpful for resolving values for alias tokens.
   */
  rawPath: string[]
  /**
   * Path of the current alias token's value.
   *
   * Note: This path has been filtered to exclude the `tokens` property.
   * Helpful for composing token names such as CSS custom properties.
   */
  getAliasPath: (aliasToken: DesignTokenAlias) => string[]
  /**
   * Raw path of the current alias token's value.
   *
   * Note: This path has not been filtered and contains the full path to
   * the current token from the root of the design tokens object.
   * Helpful for resolving values for alias tokens.
   */
  getAliasRawPath: (aliasToken: DesignTokenAlias) => string[]
  /**
   * Resolved value of the current alias token.
   */
  getAliasValue: (aliasToken: DesignTokenAlias) => string | number
}

interface CreateContextOptions {
  designTokens: DesignTokens
  traverseContext: traverse.TraverseContext
}

function createContext(options: CreateContextOptions): ParseContext {
  return {
    path: options.traverseContext.path.filter((p) => p !== 'tokens'),
    rawPath: options.traverseContext.path,
    /**
     * Parse an alias token value into an array of design token path segments.
     *
     * @example
     * const alias = { value: '{color.blue.500}'}
     * ctx.getAliasPath(alias) // ['color', 'blue', '500]
     */
    getAliasPath: (aliasToken: DesignTokenAlias) => {
      if (!isAliasToken(aliasToken)) {
        throw new Error('`getAliasPath` can only be called on an alias token.')
      }

      return aliasToken.value.trim().slice(1, -1).split('.')
    },
    getAliasRawPath: (aliasToken: DesignTokenAlias) => {
      if (!isAliasToken(aliasToken)) {
        throw new Error(
          '`getAliasRawPath` can only be called on an alias token.',
        )
      }

      console.log('`getAliasRawPath` Not implemented.')
      return []
    },
    getAliasValue: function (aliasToken: DesignTokenAlias) {
      if (!isAliasToken(aliasToken)) {
        throw new Error('`getAliasValue` can only be called on an alias token.')
      }

      // const rawPath = this.getAliasRawPath()
      // const value = get(options.designTokens, rawPath)

      console.log('`getAliasValue` Not implemented.')
      return ''
    },
  }
}
