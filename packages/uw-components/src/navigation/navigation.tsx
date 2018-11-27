// tslint:disable:no-any
import * as React from "react"
import {Category, CategoryType} from "@uw/domain"
import * as Styled from "./navigation.css"

interface NavigationComponentProps {
  activeNode: React.RefObject<any>
  categoryKey: string
  categoryList: Category[]
  categoryTitle: string
  categoryType: string
  isNavigationTitleMenuOpen: boolean
  isNavigationTypeMenuOpen: boolean
  next: any
  openNavigationTitleMenu: () => void
  openNavigationTypeMenu: () => void
  prev: any
  setCategory: (key: string) => void
  setCategoryType: (type: CategoryType) => void
}

export class ExplorerNavigation extends React.PureComponent<NavigationComponentProps> {
  render() {
    const {
      activeNode,
      categoryKey,
      categoryList,
      categoryTitle,
      categoryType,
      isNavigationTitleMenuOpen,
      isNavigationTypeMenuOpen,
      openNavigationTitleMenu,
      openNavigationTypeMenu,
      setCategory,
      setCategoryType,
      next,
      prev,
    } = this.props

    return (
      <Styled.ExplorerNavigation reveal={categoryList && categoryList.length > 0}>
        <Styled.NavigationCategory>
          <Styled.TypeInnerContainer>
            <Styled.CategoryType onClick={openNavigationTypeMenu}>
              {categoryType}
            </Styled.CategoryType>
            <Styled.CategoryTitle onClick={openNavigationTitleMenu}>
              <span>{categoryTitle}</span>
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
        {isNavigationTypeMenuOpen && (
          <Styled.NavigationMenu isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}>
            <Styled.MenuItem key="blocks" onClick={() => setCategoryType("blocks")}>
              blocks
            </Styled.MenuItem>
            <Styled.MenuItem key="scripts" onClick={() => setCategoryType("scripts")}>
              scripts
            </Styled.MenuItem>
            <Styled.MenuItem key="symbols" onClick={() => setCategoryType("symbols")}>
              symbols
            </Styled.MenuItem>
          </Styled.NavigationMenu>
        )}
        {isNavigationTitleMenuOpen && (
          <Styled.NavigationMenu>
            {categoryList
              .filter((category: Category) => category.parent === 0)
              .map((category: Category) => {
                const children = categoryList.filter(
                  (child: Category) => child.parent === category.index,
                )
                return (
                  <React.Fragment key={`fragment-${category.key}`}>
                    <Styled.MenuItem
                      isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}
                      key={`parent-${category.key}`}
                      onClick={setCategory.bind(undefined, category.key)}
                      active={category.key === categoryKey}
                      innerRef={(category.key === categoryKey && activeNode) || undefined}
                    >
                      {category.title}
                    </Styled.MenuItem>
                    {children &&
                      children.map((child: Category) => (
                        <Styled.ChildMenuItem
                          onClick={setCategory.bind(undefined, child.key)}
                          active={child.key === categoryKey}
                          innerRef={(child.key === categoryKey && activeNode) || undefined}
                          key={`child-${child.key}`}
                        >
                          {child.title}
                        </Styled.ChildMenuItem>
                      ))}
                  </React.Fragment>
                )
              })}
          </Styled.NavigationMenu>
        )}
      </Styled.ExplorerNavigation>
    )
  }
}

export default ExplorerNavigation
