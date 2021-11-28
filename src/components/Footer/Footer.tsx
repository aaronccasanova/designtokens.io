import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'
import Image from 'next/image'
import { Container as RawContainer } from '../Container'

const Root = styled.footer`
  background-color: var(--theme-color-background-surface);
`

const Container = styled(RawContainer)`
  min-height: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: calc(var(--theme-spacing) * 2);
  border-top: 1px solid var(--theme-color-text-primary);
`

export interface FooterProps {
  className?: string
}

export function Footer(props: FooterProps) {
  return (
    <Root className={props.className}>
      <Container>
        <Link href="/">
          <a>aaronccasanova</a>
        </Link>
        <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
      </Container>
    </Root>
  )
}
