import * as React from "react"
import {withRouter} from "react-router-dom"
import {push} from "connected-react-router"
import {Dispatch} from "redux"
import {connect} from "react-redux"
import {Wiki} from "@uw/components"
import {ApplicationState, loadWikiPage} from "@uw/store"
import {CodepointWikiContainerProps, InstanceState, OtherProps} from "./types"
import {generateClassName} from "@uw/utils"

class CodepointWikiContainer extends React.PureComponent<CodepointWikiContainerProps & OtherProps> {
  state: InstanceState = {
    currentCodepoint: undefined,
  }

  static getDerivedStateFromProps(nextProps: OtherProps, prevState: InstanceState) {
    console.log("getDerivedStateFromProps")
    if (
      prevState.currentCodepoint &&
      prevState.currentCodepoint.cp &&
      nextProps.codepoint.cp !== prevState.currentCodepoint.cp
    ) {
      return {
        currentCodepoint: nextProps.codepoint,
      }
    }
    return {}
  }

  componentDidMount() {
    console.log("componentDidMount")
    const {match} = this.props
    const {params} = match
    const {category, key, cp} = params
    if (cp) {
      this.props.loadWikiPage(category, key, cp)
    }
  }

  componentDidUpdate(prevProps: OtherProps) {
    console.log("componentDidUpdate")
    const {match} = prevProps
    const {params} = match
    const {category, key, cp} = params
    if (cp && this.props.match.params.cp !== cp) {
      this.props.loadWikiPage(category, key, cp)
    }
  }

  render() {
    const {codepoint, wikiPage} = this.props
    const {result, loading} = wikiPage
    const className = codepoint && generateClassName(codepoint.cp)

    return (
      <div className={className}>
        {/* {loading && <ProgessLoader />} */}
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
  loadWikiPage: (category: string, key: string, cp: string) =>
    dispatch(loadWikiPage(category, key, cp)),
  push: (path: string) => dispatch(push(path)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(CodepointWikiContainer)

export default withRouter<OtherProps>(connected)
