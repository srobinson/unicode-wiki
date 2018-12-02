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
    const {match} = this.props
    const {params} = match
    const {category, key, cp} = params
    this.props.loadWikiPage(category, key, cp, key)
  }

  componentDidUpdate(prevProps: OtherProps) {
    console.log("componentDidUpdate", prevProps, this.props)

    const {match} = this.props
    if (this.props.match.params.cp !== prevProps.match.params.cp) {
      const {params} = match
      const {category, key, cp} = params
      this.props.loadWikiPage(category, key, cp, key)
    }
    setTimeout(() => document.body.setAttribute("data-animate", "in"))
  }

  componentWillUnmount() {
    setTimeout(() => document.body.removeAttribute("data-animate"), 1000)
  }

  render() {
    const {codepoints, match, wikiPage} = this.props
    const {params} = match
    const {cp} = params
    const {result} = wikiPage
    const codepoint =
      (codepoints.result &&
        codepoints.result.docs.filter((codepoint: Codepoint) => codepoint.cp === cp)) ||
      []
    return <Wiki content={result} cp={cp} title={codepoint[0] && codepoint[0].name} />
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    codepoints: state.codepoints,
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
