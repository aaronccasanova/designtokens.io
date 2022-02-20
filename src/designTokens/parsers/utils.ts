/**
 * Creates a CSS custom property name from an array of design token segments.
 *
 * @example
 * createVar(['colors', 'blue', '500'], 'p') // '--p-colors-blue-500'
 */
export function createVar(segments: string[], prefix?: string) {
  return `--${[...(prefix ? [prefix] : []), ...segments].join('-')}`
}

/**
 * Higher order function to create prefixed CSS custom properties.
 *
 * @example
 * const createVar = createPrefixedVar('p')
 * createVar(['colors', 'blue', '500']) // '--p-colors-blue-500'
 * createVar(['colors', 'red', '500']) // '--p-colors-red-500'
 */
export function varCreator(prefix: string) {
  return (segments: string[]) => createVar(segments, prefix)
}

/**
 * Parse an alias token value into an array of design token path segments.
 *
 * @example
 * getAliasSegments('{colors.blue.500}') // ['colors', 'blue', '500]
 */
export function getAliasSegments(aliasValue: string) {
  return aliasValue.trim().slice(1, -1).split('.')
}
