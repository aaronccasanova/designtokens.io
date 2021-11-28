import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import { Container as RawContainer } from '../Container'
import { ThemePicker as RawThemePicker } from '../ThemePicker'
import { useSsr } from '../../hooks'

const Root = styled.div`
  background-color: var(--theme-color-background-surface);
  color: var(--theme-color-text-primary);
  border-bottom: 1px solid var(--theme-color-text-primary);
`

const Container = styled(RawContainer)`
  min-height: 60px;
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: calc(var(--theme-spacing) * 2);
`

const ThemePicker = styled(RawThemePicker)`
  grid-column: 3;
`

export interface NavbarProps {
  className?: string
}

export function Navbar(props: NavbarProps) {
  const { isBrowser } = useSsr()

  return (
    <Root className={props.className}>
      <Container>
        <Link href="/">
          <a>designtokens.io</a>
        </Link>
        {isBrowser && <ThemePicker />}
      </Container>
    </Root>
  )
}
