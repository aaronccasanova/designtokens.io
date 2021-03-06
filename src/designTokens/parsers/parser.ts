import type {
  AllDesignTokens,
  DesignTokens,
  DesignToken,
  DesignTokenAlias,
  DesignTokenGroup,
} from '../utils/types'

interface ParseDesignTokenOptions {
  onToken?: (token: DesignToken, context: ParseContext) => void
  onAlias?: (alias: DesignTokenAlias, context: ParseContext) => void
  onGroup?: (group: DesignTokenGroup, context: ParseContext) => void
}

type ParserContext = {
  path: string[]
}

export function traverse(
  tokens: DesignTokens | DesignTokenGroup,
  cb: (node: AllDesignTokens, context: ParserContext) => void,
  _path: string[] = [],
) {
  Object.entries(tokens).forEach(([key, node]) => {
    if (typeof node === 'object' && node !== null) {
      const path = [..._path, key]
      cb(node, { path })
      traverse(node, cb, path)
    }
  })
}

export function parseDesignTokens(
  tokens: DesignTokens | DesignTokenGroup,
  options: ParseDesignTokenOptions,
): void {
  traverse(tokens, (node, context) => {
    if (isDesignToken(node)) {
      if (isAliasToken(node)) {
        // Alias token
        options?.onAlias?.(node, createContext({ tokens, context }))
      } else {
        // Design token
        options?.onToken?.(node, createContext({ tokens, context }))
      }
    } else if (isTokenGroup(node)) {
      // Token group
      options?.onGroup?.(node, createContext({ tokens, context }))
    }
  })
}
export function isDesignToken(
  tokenOrGroup: AllDesignTokens,
): tokenOrGroup is DesignToken {
  return Boolean((tokenOrGroup as DesignToken)?.$value)
}

export function isAliasToken(
  tokenOrGroup: AllDesignTokens,
): tokenOrGroup is DesignTokenAlias {
  if (isDesignToken(tokenOrGroup)) {
    const $value = tokenOrGroup.$value
    return typeof $value === 'string' && $value.startsWith('{')
  }

  return false
}

export function isTokenGroup(
  tokenOrGroup: AllDesignTokens,
): tokenOrGroup is DesignTokenGroup {
  return Boolean((tokenOrGroup as DesignTokenGroup)?.$tokens)
}

interface ParseContext {
  /**
   * Path of the current token.
   *
   * Note: This path has been filtered to exclude the `$tokens` property.
   * Helpful for composing token names such as CSS custom properties.
   */
  path: string[]
  /**
   * Raw path of the current token.
   *
   * Note: This path has not been filtered and contains the full path to
   * the current token from the root of the design tokens object.
   * Helpful for resolving an alias tokens $value.
   */
  rawPath: string[]
  /**
   * Path of the current alias token's $value.
   *
   * Note: This path has been filtered to exclude the `$tokens` property.
   * Helpful for composing token names such as CSS custom properties.
   */
  getAliasPath: (aliasToken: DesignTokenAlias) => string[]
  /**
   * Raw path of the current alias token's $value.
   *
   * Note: This path has not been filtered and contains the full path to
   * the current token from the root of the design tokens object.
   * Helpful for resolving an alias token $value.
   */
  getAliasRawPath: (aliasToken: DesignTokenAlias) => string[]
  /**
   * Resolved $value of the current alias token.
   */
  getAliasValue: (aliasToken: DesignTokenAlias) => string | number
}

interface CreateContextOptions {
  tokens: DesignTokens | DesignTokenGroup
  context: ParserContext
}

function createContext(options: CreateContextOptions): ParseContext {
  return {
    path: options.context.path.filter((p) => p !== '$tokens'),
    rawPath: options.context.path,
    /**
     * Parse an alias token $value into an array of design token path segments.
     *
     * @example
     * const alias = { $value: '{colors.blue.500}'}
     * ctx.getAliasPath(alias) // ['colors', 'blue', '500]
     */
    getAliasPath(aliasToken: DesignTokenAlias) {
      if (!isAliasToken(aliasToken)) {
        throw new Error('`getAliasPath` can only be called on an alias token.')
      }

      return aliasToken.$value.trim().slice(1, -1).split('.')
    },
    /**
     * Parse an alias token $value into an array of the full design token path segments.
     *
     * @example
     * const alias = { $value: '{colors.blue.500}'}
     * ctx.getAliasRawPath(alias) // ['colors', '$tokens', 'blue', '$tokens', '500]
     */
    getAliasRawPath(aliasToken: DesignTokenAlias) {
      if (!isAliasToken(aliasToken)) {
        throw new Error(
          '`getAliasRawPath` can only be called on an alias token.',
        )
      }

      return aliasToken.$value
        .trim()
        .slice(1, -1)
        .replace(/\./g, '.$tokens.')
        .split('.')
    },
    /**
     * Retrieves the alias token $value from the design tokens object.
     *
     * @example
     * const alias = { $value: '{colors.blue.500}'}
     * ctx.getAliasValue(alias) // #0000ff
     */
    getAliasValue(aliasToken: DesignTokenAlias) {
      if (!isAliasToken(aliasToken)) {
        throw new Error('`getAliasValue` can only be called on an alias token.')
      }

      const rawPath = this.getAliasRawPath(aliasToken)

      let $value: any = options.tokens

      // TODO: https://github.com/angus-c/just/tree/master/packages/object-safe-get
      for (const key of rawPath) {
        $value = $value[key]
      }

      return $value as DesignToken['$value']
    },
  }
}
