import * as React from "react"
import * as Styled from "./navigation-bar.css"
import {Category} from "@uw/domain"

interface NavigationBarProps {
  categoryType: string
  currentCategory: Category | undefined
  next: () => void
  openNavigationTitleMenu: () => void
  openNavigationTypeMenu: () => void
  prev: () => void
}

export class NavigationBar extends React.PureComponent<NavigationBarProps> {
  render() {
    const {
      categoryType,
      currentCategory,
      next,
      openNavigationTitleMenu,
      openNavigationTypeMenu,
      prev,
    } = this.props
    return (
      <Styled.NavigationCategory>
        <Styled.TypeInnerContainer>
          <Styled.CategoryType onClick={openNavigationTypeMenu}>{categoryType}</Styled.CategoryType>
          <Styled.CategoryTitle onClick={openNavigationTitleMenu}>
            <span>{currentCategory && currentCategory.title}</span>
          </Styled.CategoryTitle>
        </Styled.TypeInnerContainer>
        <Styled.TitleInnerContainer>
          <Styled.Prev disabled={!prev} onClick={prev}>
            &lt;
          </Styled.Prev>
          <Styled.Next disabled={!next} onClick={next}>
            &gt;
          </Styled.Next>
        </Styled.TitleInnerContainer>
      </Styled.NavigationCategory>
    )
  }
}
