import * as React from "react"
import * as Styled from "./navigation-tabs.css"
import {CategoryType} from "@uw/domain"
import {fromCharCode} from "@uw/utils"

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
          <Styled.Tab
            active={categoryType === "blocks"}
            onClick={() => setCategoryType("blocks", false)}
          >
            All
          </Styled.Tab>
          <Styled.Tab
            active={categoryType === "scripts"}
            onClick={() => setCategoryType("scripts", false)}
          >
            Scripts
          </Styled.Tab>
          <Styled.Tab
            active={categoryType === "symbols"}
            onClick={() => setCategoryType("symbols", false)}
          >
            Symbols
          </Styled.Tab>
          <Styled.Cancel onClick={cancel}>
            <span className="u2400">{fromCharCode("274C")}</span>
          </Styled.Cancel>
        </Styled.InnerContainer>
      </Styled.NavigationTabs>
    )
  }
}
