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
            {categoryList.map((category: Category) => {
              return (
                <React.Fragment
                  key={`fragment-${category.level}=${category.parent}:${category.index}:${
                    category.key
                  }`}
                >
                  {category.level === 0 ? (
                    <Styled.MenuItem
                      isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}
                      key={`parent-${category.level}=${category.parent}:${category.index}:${
                        category.key
                      }`}
                      onClick={setCategory.bind(undefined, category.key)}
                      active={category.key === categoryKey}
                      innerRef={(category.key === categoryKey && activeNode) || undefined}
                    >
                      {`${category.parent}:${category.index}:${category.title}`}
                    </Styled.MenuItem>
                  ) : (
                    <Styled.ChildMenuItem
                      onClick={setCategory.bind(undefined, category.key)}
                      active={category.key === categoryKey}
                      innerRef={(category.key === categoryKey && activeNode) || undefined}
                      key={`child-${category.level}-${category.parent}:${category.index}:${
                        category.key
                      }`}
                      level={category.level}
                    >
                      {`${category.parent}:${category.index}:${category.title}`}
                    </Styled.ChildMenuItem>
                  )}
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
