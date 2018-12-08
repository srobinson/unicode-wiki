import * as React from "react"
import * as Styled from "./button.css"
import {ButtonProps} from "./types"

export class Button extends React.PureComponent<ButtonProps> {
  render() {
    const {active = false, children, onClick} = this.props
    let buttonProps = {}
    if (onClick) {
      buttonProps = {onClick}
    }
    return (
      <Styled.Button active={active} {...buttonProps}>
        {children && children}
      </Styled.Button>
    )
  }
}
