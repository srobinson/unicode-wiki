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

  static getDerivedStateFromProps(nextProps: OtherProps, prevState: InstanceState) {
    if (nextProps) {
      const {match} = nextProps
      const {params} = match
      let {category, key} = params
      const categoryList = nextProps[category].docs
      if (categoryList.length) {
        if (category !== prevState.categoryType) {
          return {
            categoryList: categoryList,
            categoryType: category,
            currentCategory: categoryList[0],
            next: categoryList[1].key,
          }
        } else if (prevState.currentCategory && key !== prevState.currentCategory.key) {
          const index = categoryList.findIndex((category: Category) => category.key === key)
          return {
            currentCategory: categoryList[index],
            next: categoryList[index + 1] && categoryList[index + 1].key,
            prev: categoryList[index - 1] && categoryList[index - 1].key,
          }
        }
      }
    }
    return {}
  }

  setCategory = (key: string) => {
    const {categoryType} = this.state
    const nextUrl = `/c/${categoryType}/${key}`
    this.props.push(nextUrl)
  }

  setCategoryType = (type: CategoryType) => {
    const docs = this.props[type].docs
    const category = docs[0]
    const nextUrl = `/c/${type}/${category.key}`
    this.props.push(nextUrl)
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
