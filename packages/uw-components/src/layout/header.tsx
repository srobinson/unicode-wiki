import * as React from "react"
import Logo from "./logo"
import Menu from "./menu"
import * as Styled from "./header.css"

// 0E1F u0800
/** @augments {React.Component<object, object>} */
export const Header: React.SFC<HeaderProps> = ({children, cp}) => (
  <Styled.Header>
    <Styled.HeaderInner>
      <Logo cp={cp} />
      {children}
      <Menu />
    </Styled.HeaderInner>
  </Styled.Header>
)

interface HeaderProps {
  children?: React.ReactNode
  cp?: string
}

export default Header
