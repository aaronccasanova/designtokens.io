import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import dynamic from 'next/dynamic'

import { Container as RawContainer } from '../Container'

const DynamicThemePicker = dynamic(() => import('../ThemePicker'), {
  ssr: false,
})

const Root = styled.div`
  background-color: var(--theme-colors-background-surface);
  color: var(--theme-colors-text-primary);
  border-bottom: 1px solid var(--theme-colors-text-primary);
`

const Container = styled(RawContainer)`
  min-height: 60px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: calc(var(--theme-spacing) * 2);
`

const ThemePicker = styled(DynamicThemePicker)`
  grid-column: 3;
`

export interface NavbarProps {
  className?: string
}

export function Navbar(props: NavbarProps) {
  return (
    <Root className={props.className}>
      <Container>
        <Link href="/">
          <a>designtokens.io</a>
        </Link>
        <ThemePicker />
      </Container>
    </Root>
  )
}
