import React from 'react'
import styled from 'styled-components'
import { Navbar } from '../Navbar'
import { Footer } from '../Footer'

const Root = styled.div`
  min-height: 100vh;
  background-color: var(--theme-color-background-default);
  color: var(--theme-color-text-primary);

  display: flex;
  flex-direction: column;
`

const Container = styled.div`
  flex: 1 1 auto;
`

export interface LayoutProps {
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  return (
    <Root>
      <Navbar />
      <Container>{props.children}</Container>
      <Footer />
    </Root>
  )
}

export default Layout
