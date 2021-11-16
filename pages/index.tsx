import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'

import styles from '../styles/Home.module.css'

import { Layout, ThemeProvider } from '../src/components'
import { themes } from '../src/designTokens'

const Container = styled.div`
  background-color: var(--theme-color-background-default);
  color: var(--theme-color-text-primary);
  font-size: 50px;
  padding: 20px;
`

const Home: NextPage = () => {
  return (
    <Layout>
      <Head>
        <title>Design Tokens IO</title>
        <meta
          name="description"
          content="A tool for creating design token systems."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Design Tokens IO</h1>
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

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          aaronccasanova...{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </Layout>
  )
}

export default Home
