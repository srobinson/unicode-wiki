// tslint:disable:no-any
import * as React from "react"
import {push} from "connected-react-router"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {ApplicationState, fetchCategory} from "@uw/store"
import {NavigationContainerProps, OtherProps, InstanceState} from "./types"
import {ExplorerNavigation} from "@uw/components"
import {Category, CATEGORY_TYPE} from "@uw/domain"
import {CategoryType} from "@uw/domain"

class NavigationContainer extends React.Component<NavigationContainerProps & OtherProps> {
  state: InstanceState = {
    categoryKey: "",
    categoryList: [],
    categoryTitle: "",
    categoryType: "",
    isNavigationTitleMenuOpen: false,
    isNavigationTypeMenuOpen: false,
    next: "",
    prev: "",
  }

  private activeNode = React.createRef<any>()

  constructor(props: NavigationContainerProps & OtherProps) {
    super(props)
    props.fetchCategory(CATEGORY_TYPE.BLOCK)
    props.fetchCategory(CATEGORY_TYPE.SCRIPT)
    props.fetchCategory(CATEGORY_TYPE.SYMBOL)
  }

  static getDerivedStateFromProps(nextProps: OtherProps, prevState: InstanceState) {
    if (nextProps) {
      const {match} = nextProps
      const {params} = match
      let {category, key} = params
      const categoryList = nextProps[category].docs
      if (categoryList.length) {
        if (category !== prevState.categoryType) {
          key = categoryList[0].key
          return {
            categoryKey: key,
            categoryList: categoryList,
            categoryTitle: categoryList[0].title,
            categoryType: category,
            next: categoryList[1].key,
          }
        } else if (key !== prevState.categoryKey) {
          console.log("categoryList", categoryList)
          console.log("key", key)
          const index = categoryList.findIndex((category: Category) => category.key === key)
          console.log("index", index)
          const prev = categoryList[index - 1] && categoryList[index - 1].key
          const next = categoryList[index + 1] && categoryList[index + 1].key
          return {
            categoryKey: key,
            categoryTitle: categoryList[index].title,
            next,
            prev,
          }
        }
      }
    }
    return {}
  }

  openNavigationTitleMenu = () => {
    this.setState(
      {
        isNavigationTitleMenuOpen: !this.state.isNavigationTitleMenuOpen,
        isNavigationTypeMenuOpen: false,
      },
      () => {
        const activeComponent = this.activeNode.current
        if (activeComponent) {
          activeComponent.scrollIntoView(true)
        }
      },
    )
  }

  openNavigationTypeMenu = () => {
    this.setState({
      isNavigationTitleMenuOpen: false,
      isNavigationTypeMenuOpen: !this.state.isNavigationTypeMenuOpen,
    })
  }

  setCategory = (key: string) => {
    const {categoryType} = this.state
    const nextUrl = `/c/${categoryType}/${key}`
    this.setState(
      {
        isNavigationTitleMenuOpen: false,
      },
      () => this.props.push(nextUrl),
    )
  }

  setCategoryType = (type: CategoryType) => {
    const docs = this.props[type].docs
    const category = docs[0]
    const nextUrl = `/c/${type}/${category.key}`
    this.setState(
      {
        isNavigationTypeMenuOpen: false,
      },
      () => this.props.push(nextUrl),
    )
  }

  render() {
    const {
      categoryList,
      categoryKey,
      categoryTitle,
      categoryType,
      isNavigationTypeMenuOpen,
      isNavigationTitleMenuOpen,
      next,
      prev,
    } = this.state

    return (
      <ExplorerNavigation
        activeNode={this.activeNode}
        categoryList={categoryList}
        categoryKey={categoryKey}
        categoryTitle={categoryTitle}
        categoryType={categoryType}
        isNavigationTitleMenuOpen={isNavigationTitleMenuOpen}
        isNavigationTypeMenuOpen={isNavigationTypeMenuOpen}
        openNavigationTitleMenu={this.openNavigationTitleMenu}
        openNavigationTypeMenu={this.openNavigationTypeMenu}
        setCategory={this.setCategory}
        setCategoryType={this.setCategoryType}
        next={next ? () => this.setCategory(next) : undefined}
        prev={prev ? () => this.setCategory(prev) : undefined}
      />
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  blocks: state.blocks,
  scripts: state.scripts,
  symbols: state.symbols,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchCategory: (category: CATEGORY_TYPE) => dispatch(fetchCategory(category)),
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(NavigationContainer)

export default withRouter<OtherProps>(connected)
