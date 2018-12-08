// tslint:disable:no-any
import * as React from "react"
import * as ReactDOM from "react-dom"
import {Category, CategoryType} from "@uw/domain"
import * as Styled from "./navigation.css"
import {NavigationSearch} from "./navigation-search"
import {categoryTypes, InternalState, NavigationComponentProps} from "./types"

export class ExplorerNavigation extends React.PureComponent<NavigationComponentProps> {
  state: InternalState = {
    isNavigationTitleMenuOpen: false,
    isNavigationTypeMenuOpen: false,
    searchCategories: undefined,
  }

  private activeNode = React.createRef<any>()
  // @ts-ignore
  private menu: HTMLInputElement | undefined

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
          document.body.classList.toggle("is-locked", true)
          activeComponent.scrollIntoView({behavior: "smooth", block: "center"})
        }
      },
    )
  }

  searchCategories = (term: string) => {
    const {categoryList} = this.props
    const searchCategories = categoryList.filter((category: Category) =>
      category.title.match(new RegExp(term, "gi")),
    )
    this.setState(
      {
        searchCategories,
      },
      () => {
        if (this.menu) {
          const node = ReactDOM.findDOMNode(this.menu)
          if (node) {
            // @ts-ignore
            node.scrollTop = 0
          }
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
    this.props.prev()
  }

  close = () => {
    this.setState(
      {
        isNavigationTitleMenuOpen: false,
        isNavigationTypeMenuOpen: false,
        searchCategories: undefined,
      },
      () => document.body.classList.toggle("is-locked", false),
    )
  }

  render() {
    const {currentCategory, categoryList, categoryType, next, prev} = this.props
    const {isNavigationTitleMenuOpen, isNavigationTypeMenuOpen, searchCategories} = this.state
    const categories = searchCategories ? searchCategories : categoryList
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
            {categoryTypes.map((type: CategoryType) => (
              <Styled.MenuItem
                isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}
                key={type}
                onClick={() => this.setCategoryType(type)}
              >
                {type}
              </Styled.MenuItem>
            ))}
          </Styled.NavigationMenu>
        )}
        {isNavigationTitleMenuOpen && (
          // tslint:disable-next-line:no-any
          <Styled.NavigationMenuContainer ref={(ref: any) => (this.menu = ref)}>
            <NavigationSearch cancel={this.close} searchCategories={this.searchCategories} />
            <Styled.NavigationMenu>
              {searchCategories &&
                !searchCategories.length && (
                  <Styled.NoResults>No matches returned...</Styled.NoResults>
                )}
              {categories.map((category: Category) => {
                return (
                  <React.Fragment
                    key={`fragment-${category.level}=${category.parent}:${category.index}:${
                      category.key
                    }`}
                  >
                    <Styled.MenuItem
                      active={currentCategory && category.key === currentCategory.key}
                      categoryType={categoryType}
                      innerRef={
                        (currentCategory &&
                          category.key === currentCategory.key &&
                          this.activeNode) ||
                        undefined
                      }
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
