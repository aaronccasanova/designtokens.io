import type { AppProps } from 'next/app'

import { Providers } from '../src/providers'
import { Layout, GlobalStyle } from '../src/components'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      <Providers>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  )
}
