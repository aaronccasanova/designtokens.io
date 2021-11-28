import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import { ThemeProvider } from '../src/providers'
import { themes } from '../src/designTokens'

const Container = styled.div`
  background-color: var(--theme-color-background-default);
  color: var(--theme-color-text-primary);
  font-size: 50px;
  padding: 20px;
`

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Design Tokens IO</title>
        <meta
          name="description"
          content="A tool for creating design token systems."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Container>
          Default dark theme
          <ThemeProvider theme={themes.light}>
            <Container>
              Nested light theme
              <ThemeProvider theme={themes.dim}>
                <Container>Nested dim theme</Container>
              </ThemeProvider>
            </Container>
          </ThemeProvider>
        </Container>
      </main>
    </>
  )
}

export default Home
