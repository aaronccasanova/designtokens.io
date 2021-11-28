import type { NextPage } from 'next'
import Head from 'next/head'
import { Container } from '../src/components'

// TODO:
// - Clean up and PR all current changes.
// - Use this file to test rendering a preview of all the tokens.
// - Persist color-scheme in localStorage.
// - Optimize parseToVars/ThemeProvider implementation.
//   (In the performance tab, it looks like it's executing over 12ms)
// - Generate and inject style tag in the head
// - Inject script that reads theme from local storage and sets a class on the body
// - See if we can generate a style sheet, inject in the head, and cache it.
//

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
