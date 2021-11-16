/**
 * Creates a CSS custom property name from an array of design token segments.
 *
 * @example
 * createVar(['color', 'blue', '500'], 'p') // '--p-color-blue-500'
 */
export function createVar(segments: string[], prefix?: string) {
  return `--${[...(prefix ? [prefix] : []), ...segments].join('-')}`
}

/**
 * Higher order function to create prefixed CSS custom properties.
 *
 * @example
 * const createVar = createPrefixedVar('p')
 * createVar(['color', 'blue', '500']) // '--p-color-blue-500'
 * createVar(['color', 'red', '500']) // '--p-color-red-500'
 */
export function varCreator(prefix: string) {
  return (segments: string[]) => createVar(segments, prefix)
}

/**
 * Parse an alias token value into an array of design token path segments.
 *
 * @example
 * getAliasSegments('{color.blue.500}') // ['color', 'blue', '500]
 */
export function getAliasSegments(aliasValue: string) {
  return aliasValue.trim().slice(1, -1).split('.')
}
