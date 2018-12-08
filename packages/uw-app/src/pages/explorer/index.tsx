import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {ApplicationState} from "@uw/store"
import {CodepointContainer, NavigationContainer} from "@uw/containers"
import {
  Card,
  Header,
  InfinityLoader,
  ToolMenu,
  TypeAheadSearch,
  Page,
  WikiTitle,
} from "@uw/components"
import {delayedPush} from "@uw/utils"
import {WikiPageProps, OtherProps} from "./types"
import * as Styled from "../styles.css"

interface InternalState {
  showSearch: boolean
}

class ExplorerPage extends React.PureComponent<WikiPageProps & OtherProps> {
  state: InternalState = {
    showSearch: false,
  }

  toggleSearch = () => {
    this.setState({
      showSearch: !this.state.showSearch,
    })
  }

  closeWikiPage = () => {
    const {match, push} = this.props
    const {params} = match
    const {category, key} = params
    delayedPush(() => push(`/c/${category}/${key}`), 100)
  }

  renderNavBar = () => {
    const {match, wikiPage} = this.props
    const {params} = match
    const {cp} = params
    const isWikiPage = cp !== undefined
    const title = (isWikiPage && wikiPage.result && wikiPage.result.title) || "Loading..."
    if (isWikiPage) {
      return <WikiTitle close={this.closeWikiPage} loading={wikiPage.loading} title={title} />
    }
    return <NavigationContainer />
  }

  render() {
    const {showSearch} = this.state
    const navBarContent = this.renderNavBar()
    return (
      <React.Fragment>
        <Header>
          {showSearch ? (
            <TypeAheadSearch />
          ) : (
            <Styled.NavigationBar>{navBarContent}</Styled.NavigationBar>
          )}
          <ToolMenu showSearch={showSearch} toggleSearch={this.toggleSearch} />
        </Header>

        <Page>
          <CodepointContainer cardComponent={Card} loadingComponent={InfinityLoader} />
        </Page>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    loader: state.loader,
    wikiPage: state.wikiPage,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(ExplorerPage)

export default withRouter<OtherProps>(connected)
