import * as React from "react"
import * as Styled from "./tool-menu.css"
import {Button} from "../button"

interface ToolMenuProps {
  showSearch: boolean
  toggleSearch: () => void
}

export class ToolMenu extends React.PureComponent<ToolMenuProps> {
  render() {
    const {showSearch, toggleSearch} = this.props
    return (
      <Styled.ToolMenu>
        <Button onClick={toggleSearch} active={showSearch}>
          1
        </Button>
        <Button>2</Button>
        <Button>3</Button>
      </Styled.ToolMenu>
    )
  }
}
