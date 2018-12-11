import * as React from "react"
import * as Styled from "./navigation-tabs.css"
import {CategoryType} from "@uw/domain"
import {fromCharCode} from "@uw/utils"
import {Button} from "../../button"

interface NavigationTabsProps {
  cancel: () => void
  categoryType: string
  setCategoryType: (type: CategoryType, close: boolean) => void
}

export class NavigationTabs extends React.PureComponent<NavigationTabsProps> {
  render() {
    const {cancel, categoryType = "blocks", setCategoryType} = this.props
    return (
      <Styled.NavigationTabs>
        <Styled.InnerContainer>
          <Button
            active={categoryType === "blocks"}
            onClick={() => setCategoryType("blocks", false)}
            type="Tab"
          >
            All
          </Button>
          <Button
            active={categoryType === "scripts"}
            onClick={() => setCategoryType("scripts", false)}
            type="Tab"
          >
            Scripts
          </Button>
          <Button
            active={categoryType === "symbols"}
            onClick={() => setCategoryType("symbols", false)}
            type="Tab"
          >
            Symbols
          </Button>
          <Button onClick={cancel} type="Cancel">
            <span className="u2400">{fromCharCode("274C")}</span>
          </Button>
        </Styled.InnerContainer>
      </Styled.NavigationTabs>
    )
  }
}
