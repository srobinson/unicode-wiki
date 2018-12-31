// tslint:disable:no-any
import * as React from "react"
import {push} from "connected-react-router"
import {withRouter} from "react-router-dom"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {ApplicationState, fetchCategory} from "@uw/store"
import {NavigationContainerProps, OtherProps, InstanceState} from "./types"
import {ExplorerNavigation} from "@uw/components"
import {Category, CategoryType, CATEGORY_TYPE} from "@uw/domain"

class NavigationContainer extends React.Component<NavigationContainerProps & OtherProps> {
  state: InstanceState = {
    categoryList: [],
    categoryType: "",
    currentCategory: undefined,
    next: "",
    prev: "",
  }

  constructor(props: NavigationContainerProps & OtherProps) {
    super(props)
    if (!props.blocks.docs.length) {
      props.fetchCategory(CATEGORY_TYPE.BLOCK)
      props.fetchCategory(CATEGORY_TYPE.SCRIPT)
      props.fetchCategory(CATEGORY_TYPE.SYMBOL)
    }
  }

  static getDerivedStateFromProps(
    nextProps: NavigationContainerProps & OtherProps,
    prevState: InstanceState,
  ) {
    if (
      !(
        nextProps.blocks.docs.length &&
        nextProps.scripts.docs.length &&
        nextProps.symbols.docs.length
      )
    ) {
      return {}
    }
    const {match} = nextProps
    const {params: nextParams} = match
    const categoryType = NavigationContainer.inferCategoryType(nextProps, prevState)
    const categoryList = nextProps[categoryType].docs
    const index =
      categoryList.findIndex((category: Category) => category.key === nextParams.key) || 0
    const state = {
      categoryList: categoryList,
      categoryType: categoryType,
      currentCategory: categoryList[index],
      next: categoryList[index + 1] && categoryList[index + 1].key,
    }
    if (index > 0) {
      Object.assign(state, {
        prev: categoryList[index - 1] && categoryList[index - 1].key,
      })
    }
    return state
  }

  // if user selects category from navigation component
  // -> get categoryType from nextProps.match object
  // if this is the 404 page or search page
  // -> get categoryType candidate from nextProps.location
  static inferCategoryType = (
    nextProps: NavigationContainerProps & OtherProps,
    prevState: InstanceState,
  ) => {
    const {match} = nextProps
    const {params: nextParams} = match
    const categoryFromPathname =
      (nextProps.location.pathname.split("/").length > 1 &&
        nextProps.location.pathname.split("/")[1]) ||
      ""
    const categoryType =
      nextParams.category ||
      (Object.values(CATEGORY_TYPE).includes(categoryFromPathname.toUpperCase()) &&
        categoryFromPathname) ||
      prevState.categoryType ||
      "blocks"

    return categoryType
  }

  setCategory = (key: string) => {
    const {cb} = this.props
    const {categoryType} = this.state
    const nextUrl = `/${categoryType}/${key}`
    this.props.push(nextUrl)
    if (cb) {
      cb()
    }
  }

  setCategoryType = (type: CategoryType) => {
    const {cb} = this.props
    const docs = this.props[type].docs
    const category = docs[0]
    const nextUrl = `/${type}/${category.key}`
    this.props.push(nextUrl)
    if (cb) {
      cb()
    }
  }

  render() {
    const {categoryList, categoryType, currentCategory, next, prev} = this.state
    return (
      <ExplorerNavigation
        categoryList={categoryList}
        categoryType={categoryType}
        currentCategory={currentCategory}
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
  notifications: state.notifications,
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
