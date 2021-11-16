import React from 'react'
import styled from 'styled-components'

const Root = styled.div`
  min-height: 100vh;
  background-color: var(--theme-color-background-default);
  color: var(--theme-color-text-primary);
`

export interface LayoutProps {
  className?: string
  children: React.ReactNode
}

export function Layout(props: LayoutProps) {
  return <Root className={props.className}>{props.children}</Root>
}

export default Layout
