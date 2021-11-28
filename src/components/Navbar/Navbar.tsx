import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { ThemePicker } from '../ThemePicker'
import { Container as RawContainer } from '../Container'

const Root = styled.div`
  background-color: var(--theme-color-background-surface);
  color: var(--theme-color-text-primary);
  border-bottom: 1px solid var(--theme-color-text-primary);
`

const Container = styled(RawContainer)`
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: calc(var(--theme-spacing) * 2);
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
