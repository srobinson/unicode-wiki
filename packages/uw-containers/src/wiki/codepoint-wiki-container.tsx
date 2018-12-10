import * as React from "react"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import {Wiki} from "@uw/components"
import {ApplicationState, loadWikiPage} from "@uw/store"
import {Codepoint} from "@uw/domain"
import {isHex} from "@uw/utils"
import {CodepointWikiContainerProps, OtherProps} from "./types"

class CodepointWikiContainer extends React.PureComponent<CodepointWikiContainerProps & OtherProps> {
  componentDidMount() {
    this.loadWiki()
  }

  componentDidUpdate(prevProps: OtherProps) {
    if (this.props.location["query"].cp !== prevProps.location["query"].cp) {
      this.loadWiki()
    }
  }

  loadWiki = () => {
    const {codepoint, cp} = this.props
    this.props.loadWikiPage(cp, (codepoint && codepoint["title"]) || "")
    setTimeout(() => document.body.setAttribute("data-animate", "in"))
  }

  render() {
    const {cp, wikiPage} = this.props
    const {result} = wikiPage
    return <React.Fragment>{isHex(cp) && <Wiki content={result} cp={cp} />}</React.Fragment>
  }
}

const mapStateToProps = (state: ApplicationState, props: OtherProps) => {
  const {codepoints} = state
  const {cp} = props
  const codepoint =
    (codepoints.result &&
      codepoints.result.docs.filter((codepoint: Codepoint) => codepoint.cp === cp)) ||
    []

  return {
    codepoint: (codepoint.length && codepoint[0]) || undefined,
    codepoints: state.codepoints,
    cp,
    loader: state.loader,
    wikiPage: state.wikiPage,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  loadWikiPage: (cp: string, page: string) => dispatch(loadWikiPage(cp, page)),
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(CodepointWikiContainer)

export default withRouter<OtherProps>(connected)
