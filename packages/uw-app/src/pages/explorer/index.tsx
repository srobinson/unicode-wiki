import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {ApplicationState} from "@uw/store"
import {CodepointContainer, NavigationContainer} from "@uw/containers"
import {Card, Header, InfinityLoader, Page, WikiTitle} from "@uw/components"
import {WikiPageProps, OtherProps} from "./types"
import * as Styled from "../styles.css"

class ExplorerPage extends React.PureComponent<WikiPageProps & OtherProps> {
  renderNavBar = () => {
    const {match, wikiPage} = this.props
    const {params} = match
    const {cp} = params
    const isWikiPage = cp !== undefined
    const title = (isWikiPage && wikiPage.result && wikiPage.result.title) || ""

    if (isWikiPage) {
      return <WikiTitle close={this.closeWikiPage} loading={wikiPage.loading} title={title} />
    }
    return <NavigationContainer />
  }

  closeWikiPage = () => {
    const {match, push} = this.props
    const {params} = match
    const {category, key} = params
    push(`/c/${category}/${key}`)
  }

  render() {
    const {match} = this.props
    const {params} = match
    const {cp} = params
    const navBarContent = this.renderNavBar()
    return (
      <React.Fragment>
        <Header cp={cp}>
          <Styled.NavigationBar>{navBarContent}</Styled.NavigationBar>
        </Header>

        <Page>
          <CodepointContainer cardComponent={Card} loadingComponent={InfinityLoader} />
        </Page>
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  console.log("STATE", state)
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
