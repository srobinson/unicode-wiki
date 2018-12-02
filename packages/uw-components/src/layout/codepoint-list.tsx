import * as React from "react"
import * as Styled from "./codepoint-list.css"

interface CodepointListProps {
  children: React.ReactNode
}
export class CodepointList extends React.PureComponent<CodepointListProps> {
  render() {
    const {children} = this.props
    return <Styled.CodepointList>{children}</Styled.CodepointList>
  }
}
