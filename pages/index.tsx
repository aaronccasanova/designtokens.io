import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '../src/components'

// TODO:
// - Use this file to test rendering a preview of all the tokens.
// - Optimize parseToVars/ThemeProvider implementation.
//   (In the performance tab, it looks like it's executing over 12ms)
// - See if we can generate a style sheet, inject in the head, and cache it.

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

      <Container>hi</Container>
    </>
  )
}

export default Home
