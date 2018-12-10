import * as React from "react"
import * as Styled from "./tool-menu.css"
import {Button} from "../button"
import {fromCharCode} from "@uw/utils"

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
          <Styled.Icon active={showSearch} className="u1f400">
            {fromCharCode("1F50D")}
          </Styled.Icon>
        </Button>
      </Styled.ToolMenu>
    )
  }
}
