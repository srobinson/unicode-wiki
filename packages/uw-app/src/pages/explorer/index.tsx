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
}

class ExplorerPage extends React.PureComponent<WikiPageProps & OtherProps> {
  state: InternalState = {
    showSearch: false,
  }

  toggleSearch = () => {
    const {showSearch} = this.state
    const {push} = this.props
    this.setState(
      {
        showSearch: !showSearch,
      },
      () => {
        console.log("PUSH IT", this.state.showSearch)
        if (this.state.showSearch) {
          push("/search")
        } else {
          this.closeWikiPage()
        }
      },
    )
  }

  closeWikiPage = () => {
    const {match, push} = this.props
    const {params} = match
    const {category, key} = params
    delayedPush(() => push(`/c/${category}/${key}`), 100)
  }

  renderNavBar = () => {
    const isWikiPage = this.isWikiPage()
    if (isWikiPage) {
      const {wikiPage} = this.props
      const title = (wikiPage.result && wikiPage.result.title) || "Loading..."
      return <WikiTitle close={this.closeWikiPage} loading={wikiPage.loading} title={title} />
    }
    return <NavigationContainer />
  }

  isWikiPage = () => {
    const {match} = this.props
    const {params} = match
    const {cp} = params
    return cp !== undefined
  }

  render() {
    const {showSearch} = this.state
    const navBarContent = !showSearch && this.renderNavBar()
    const isWikiPage = this.isWikiPage()
    return (
      <React.Fragment>
        <Header>
          {showSearch ? (
            <SuggestContainer />
          ) : (
            <Styled.NavigationBar>{navBarContent}</Styled.NavigationBar>
          )}
          {!isWikiPage && <ToolMenu showSearch={showSearch} toggleSearch={this.toggleSearch} />}
        </Header>

        <Page>
          {!showSearch && (
            <CodepointContainer cardComponent={Card} loadingComponent={InfinityLoader} />
          )}
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
