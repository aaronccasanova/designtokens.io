import React from 'react'
import {
  localStorageThemeKey,
  rootThemeClass,
  parseToVars,
  themeKeys,
  themes,
  defaultThemeKey,
} from '../../designTokens'

export function RootTheme() {
  return (
    <>
      <style
        id="root-theme-styles"
        key="root-theme-styles"
        dangerouslySetInnerHTML={{ __html: trim(themeStyles) }}
      />
      <script
        id="root-theme-script"
        key="root-theme-script"
        dangerouslySetInnerHTML={{ __html: trim(setInitialTheme) }}
      />
    </>
  )
}

/** Removes all repeating white space characters. */
const trim = (str: string) => str.replace(/\s+/g, ' ')

const setInitialTheme = /* js */ `
(function(){
	const initialTheme = (() => {
		const storedTheme = window.localStorage.getItem('${localStorageThemeKey}');

		if (['${themeKeys.join("','")}'].includes(storedTheme)) return storedTheme;

		return matchMedia('(prefers-color-scheme: light)').matches ? 'light' : '${defaultThemeKey}';
	})();

  const root = document.documentElement;
	root.classList.add('${rootThemeClass}' + '-' + initialTheme);
  root.dataset.initialTheme = initialTheme;
})()
`

const themeStyles = /* css */ `
  :root {
		color-scheme: var(--theme-colors-scheme);

		${parseToVars(themes.light)}
	}

	@media (prefers-color-scheme: dark) {
		:root {
			${parseToVars(themes.dark)}
		}
	}

	${Object.entries(themes)
    .map((entry) => {
      const [themeKey, designTokens] = entry as [
        keyof typeof themes,
        typeof themes[keyof typeof themes],
      ]

      const selector = `.${rootThemeClass}-${themeKey}`
      const themeVars = parseToVars(designTokens)

      return `${selector}{${themeVars}}`
    })
    .join('')}
`
