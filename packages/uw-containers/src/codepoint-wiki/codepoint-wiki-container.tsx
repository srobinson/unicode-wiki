import * as React from "react"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import {Wiki} from "@uw/components"
import {ApplicationState, loadWikiPage} from "@uw/store"
import {CodepointWikiContainerProps, OtherProps} from "./types"
import {generateClassName} from "@uw/utils"

class CodepointWikiContainer extends React.PureComponent<CodepointWikiContainerProps & OtherProps> {
  componentDidMount() {
    const {codepoint, match} = this.props
    const {params} = match
    const {category, key, cp} = params
    const {name, name_v1} = codepoint
    const page = name || name_v1 || key
    this.props.loadWikiPage(category, key, cp, page)
  }

  componentDidUpdate(prevProps: OtherProps) {
    if (this.props.match.params.cp !== prevProps.match.params.cp) {
      const {codepoint, match} = this.props
      const {params} = match
      const {category, key, cp} = params
      const {name, name_v1} = codepoint
      const page = name || name_v1 || key
      this.props.loadWikiPage(category, key, cp, page)
    }
  }

  render() {
    const {codepoint, wikiPage} = this.props
    const {result, loading} = wikiPage
    const className = codepoint && generateClassName(codepoint.cp)
    return (
      <div className={className}>
        <Wiki content={result} loading={loading} />
      </div>
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
