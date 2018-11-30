// tslint:disable:no-any
import * as React from "react"
import {Category, CategoryType} from "@uw/domain"
import * as Styled from "./navigation.css"
import {NavigationSearch} from "./navigation-search"

interface NavigationComponentProps {
  // activeNode: React.RefObject<any>
  currentCategory: Category | undefined
  // categoryKey: string
  categoryList: Category[]
  // categoryTitle: string
  categoryType: string
  // isNavigationTitleMenuOpen: boolean
  // isNavigationTypeMenuOpen: boolean
  next: any
  // openNavigationTitleMenu: () => void
  // openNavigationTypeMenu: () => void
  prev: any
  setCategory: (key: string) => void
  setCategoryType: (type: CategoryType) => void
}

interface InternalState {
  isNavigationTitleMenuOpen: boolean
  isNavigationTypeMenuOpen: boolean
}

export class ExplorerNavigation extends React.PureComponent<NavigationComponentProps> {
  state: InternalState = {
    isNavigationTitleMenuOpen: false,
    isNavigationTypeMenuOpen: false,
  }

  private activeNode = React.createRef<any>()

  componentWillUpdate() {
    const {isNavigationTypeMenuOpen} = this.state
    if (isNavigationTypeMenuOpen) {
      document.body.classList.toggle("is-locked", true)
    }
  }

  componentWillUnmount() {
    document.body.classList.toggle("is-locked", false)
  }

  openNavigationTitleMenu = () => {
    this.setState(
      {
        isNavigationTitleMenuOpen: true,
        isNavigationTypeMenuOpen: false,
      },
      () => {
        const activeComponent = this.activeNode.current
        if (activeComponent) {
          activeComponent.scrollIntoView({behavior: "smooth", block: "center"})
        }
      },
    )
  }

  openNavigationTypeMenu = () => {
    this.setState({
      isNavigationTitleMenuOpen: false,
      isNavigationTypeMenuOpen: true,
    })
  }

  setCategory = (key: string) => {
    this.close()
    this.props.setCategory(key)
  }

  setCategoryType = (type: CategoryType) => {
    this.close()
    this.props.setCategoryType(type)
  }

  next = () => {
    this.close()
    this.props.next()
  }

  prev = () => {
    this.close()
    this.props.next()
  }

  close = () => {
    this.setState({
      isNavigationTitleMenuOpen: false,
      isNavigationTypeMenuOpen: false,
    })
  }

  render() {
    const {currentCategory, categoryList, categoryType, next, prev} = this.props

    const {isNavigationTitleMenuOpen, isNavigationTypeMenuOpen} = this.state

    return (
      <Styled.ExplorerNavigation reveal={categoryList && categoryList.length > 0}>
        <Styled.NavigationCategory>
          <Styled.TypeInnerContainer>
            <Styled.CategoryType onClick={this.openNavigationTypeMenu}>
              {categoryType}
            </Styled.CategoryType>
            <Styled.CategoryTitle onClick={this.openNavigationTitleMenu}>
              <span>{currentCategory && currentCategory.title}</span>
            </Styled.CategoryTitle>
          </Styled.TypeInnerContainer>
          <Styled.TitleInnerContainer>
            <Styled.Prev disabled={!prev} onClick={this.prev}>
              &lt;
            </Styled.Prev>
            <Styled.Next disabled={!next} onClick={this.next}>
              &gt;
            </Styled.Next>
          </Styled.TitleInnerContainer>
        </Styled.NavigationCategory>
        {isNavigationTypeMenuOpen && (
          <Styled.NavigationMenu isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}>
            <Styled.MenuItem key="blocks" onClick={() => this.setCategoryType("blocks")}>
              blocks
            </Styled.MenuItem>
            <Styled.MenuItem key="scripts" onClick={() => this.setCategoryType("scripts")}>
              scripts
            </Styled.MenuItem>
            <Styled.MenuItem key="symbols" onClick={() => this.setCategoryType("symbols")}>
              symbols
            </Styled.MenuItem>
          </Styled.NavigationMenu>
        )}
        {isNavigationTitleMenuOpen && (
          <Styled.NavigationMenuContainer>
            <NavigationSearch />
            <Styled.NavigationMenu>
              {categoryList.map((category: Category) => {
                return (
                  <React.Fragment
                    key={`fragment-${category.level}=${category.parent}:${category.index}:${
                      category.key
                    }`}
                  >
                    <Styled.MenuItem
                      active={currentCategory && category.key === currentCategory.key}
                      innerRef={
                        (currentCategory &&
                          category.key === currentCategory.key &&
                          this.activeNode) ||
                        undefined
                      }
                      isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}
                      key={`parent-${category.level}=${category.parent}:${category.index}:${
                        category.key
                      }`}
                      level={category.level}
                      onClick={this.setCategory.bind(undefined, category.key)}
                    >
                      {category.title}
                    </Styled.MenuItem>
                  </React.Fragment>
                )
              })}
            </Styled.NavigationMenu>
          </Styled.NavigationMenuContainer>
        )}
      </Styled.ExplorerNavigation>
    )
  }
}

export default ExplorerNavigation
