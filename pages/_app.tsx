import type { AppProps } from 'next/app'
import Head from 'next/head'
// import Script from 'next/script'

import { Providers } from '../src/providers'
import { Layout, GlobalStyle } from '../src/components'

export default function App(props: AppProps) {
  const { Component, pageProps } = props

  return (
    <>
      {/* <Script
        defer=""
        strategy="beforeInteractive"
        id="theme-script"
      >{`alert('hi')`}</Script> */}
      <Head>
        {/* <script
          key="theme-script"
          id="theme-script"
          dangerouslySetInnerHTML={{
            __html: `alert('hi')`,
          }}
        /> */}
      </Head>
      <Providers>
        <GlobalStyle />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Providers>
    </>
  )
}
