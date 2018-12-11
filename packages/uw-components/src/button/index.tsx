import * as React from "react"
import * as Styled from "./button.css"
import {ButtonProps} from "./types"

export class Button extends React.PureComponent<ButtonProps> {
  render() {
    const {active = false, children, onClick, type = "Button"} = this.props
    const ButtonType = Styled[type] || Styled.Button
    let buttonProps = {}
    if (onClick) {
      buttonProps = {onClick}
    }
    return (
      <ButtonType active={active} {...buttonProps}>
        {children && children}
      </ButtonType>
    )
  }
}
