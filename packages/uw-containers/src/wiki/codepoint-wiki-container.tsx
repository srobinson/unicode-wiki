import * as React from "react"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import {Wiki} from "@uw/components"
import {ApplicationState, loadWikiPage} from "@uw/store"
import {CodepointWikiContainerProps, OtherProps} from "./types"
import {Codepoint} from "@uw/domain"

class CodepointWikiContainer extends React.PureComponent<CodepointWikiContainerProps & OtherProps> {
  componentDidMount() {
    this.loadWiki()
  }

  componentDidUpdate(prevProps: OtherProps) {
    if (this.props.match.params.cp !== prevProps.match.params.cp) {
      this.loadWiki()
    }
  }

  loadWiki = () => {
    const {codepoint, match} = this.props
    const {params} = match
    const {category, key, cp} = params
    this.props.loadWikiPage(category, key, cp, (codepoint && codepoint.name) || key)
    setTimeout(() => document.body.setAttribute("data-animate", "in"))
  }

  render() {
    const {cp, wikiPage} = this.props
    const {result} = wikiPage
    return <Wiki content={result} cp={cp} />
  }
}

const mapStateToProps = (state: ApplicationState, props: OtherProps) => {
  const {codepoints} = state
  const {match} = props
  const {params} = match
  const {cp} = params
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
  loadWikiPage: (category: string, key: string, cp: string, page: string) =>
    dispatch(loadWikiPage(category, key, cp, page)),
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(CodepointWikiContainer)

export default withRouter<OtherProps>(connected)
