import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {ApplicationState} from "@uw/store"
import {CodepointContainer, NavigationContainer, SuggestContainer} from "@uw/containers"
import {Card, Header, InfinityLoader, ToolMenu, Page, WikiTitle} from "@uw/components"
import {delayedPush} from "@uw/utils"
import {WikiPageProps, OtherProps} from "./types"
import * as Styled from "../styles.css"

interface InternalState {
  showSearch: boolean
  toggled: boolean
}

class ExplorerPage extends React.PureComponent<WikiPageProps & OtherProps> {
  state: InternalState = {
    showSearch: false,
    toggled: false,
  }

  static getDerivedStateFromProps = (
    nextProps: WikiPageProps & OtherProps,
    prevState: InternalState,
  ) => {
    console.log(prevState)
    const query = nextProps.location["query"]
    if (!prevState.toggled) {
      return {
        showSearch: query.q && !query.cp,
      }
    }
    return {
      toggled: !query.cp,
    }
  }

  // componentDidMount() {
  //   const {location} = this.props
  //   if (location["query"].q && !location["query"].cp) {
  //     this.setState({
  //       showSearch: true,
  //     })
  //   }
  // }

  toggleSearch = () => {
    const {showSearch} = this.state
    this.setState({
      showSearch: !showSearch,
      toggled: true,
    })
  }

  closeWikiPage = () => {
    const {location, match, push} = this.props
    const queryString = location.search.replace(/(&?)cp=[0-9a-fA-F]+/, "")
    delayedPush(() => push(`${match.url}${queryString}`), 100)
  }

  renderNavBar = () => {
    const page = this.whatPage()
    if (page === "wiki") {
      const {wikiPage} = this.props
      const title = (wikiPage.result && wikiPage.result.title) || "Loading..."
      return <WikiTitle close={this.closeWikiPage} loading={wikiPage.loading} title={title} />
    }
    return <NavigationContainer />
  }

  whatPage = () => {
    const {location, match} = this.props
    const query = location["query"]
    const {path} = match
    return query.cp !== undefined ? "wiki" : path === "/search" ? "search" : "explorer"
  }

  render() {
    const {showSearch} = this.state
    const navBarContent = !showSearch && this.renderNavBar()
    const page = this.whatPage()
    return (
      <React.Fragment>
        <Header>
          {showSearch ? (
            <SuggestContainer />
          ) : (
            <Styled.NavigationBar>{navBarContent}</Styled.NavigationBar>
          )}
          {page !== "wiki" && <ToolMenu showSearch={showSearch} toggleSearch={this.toggleSearch} />}
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
