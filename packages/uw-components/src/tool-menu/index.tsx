import * as React from "react"
import * as Styled from "./tool-menu.css"
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
        <Styled.Tool active={showSearch} onClick={toggleSearch}>
          <span className="u1f400">{fromCharCode("1F50D")}</span>
        </Styled.Tool>
      </Styled.ToolMenu>
    )
  }
}
