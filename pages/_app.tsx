import type { AppProps } from 'next/app'
import { createGlobalStyle } from 'styled-components'

import { themes } from '../src/designTokens'
import { ThemeProvider } from '../src/components'

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }

  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }
`

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <GlobalStyle />
      <ThemeProvider theme={themes.dark}>
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  )
}
