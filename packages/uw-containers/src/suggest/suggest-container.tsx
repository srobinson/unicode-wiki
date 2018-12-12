import * as React from "react"
import {connect} from "react-redux"
import {push} from "connected-react-router"
import {withRouter} from "react-router-dom"
import {Dispatch} from "redux"
import {ApplicationState, searchCodepoints, fetchSuggest} from "@uw/store"
import {TypeAheadSearch} from "@uw/components"
import {debounce} from "@uw/utils"
import {SuggestContainerProps, OtherProps} from "./types"

class SuggestContainer extends React.Component<SuggestContainerProps & OtherProps> {
  fetchSuggests = debounce((prefix: string) => {
    const {fetchSuggest} = this.props
    fetchSuggest(prefix)
  }, 250)

  onSelect = (q: string) => {
    const {push} = this.props
    push(`/search?q=${q}`)
    window.scrollTo(0, 0)
  }

  render() {
    const {location, suggest} = this.props
    const {loading, result} = suggest
    return (
      <TypeAheadSearch
        fetchSuggests={this.fetchSuggests}
        inputValue={location["query"].q}
        items={result || []}
        loading={loading}
        onSelect={this.onSelect}
      />
    )
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  suggest: state.suggest,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  fetchSuggest: (prefix: string) => dispatch(fetchSuggest(prefix)),
  push: (path: string) => dispatch(push(path)),
  searchCodepoints: (q: string) => dispatch(searchCodepoints(q)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestContainer)

export default withRouter(connected)
