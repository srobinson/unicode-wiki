import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {ApplicationState, searchCodepoints, fetchSuggest} from "@uw/store"
import {TypeAheadSearch} from "@uw/components"
import {debounce} from "@uw/utils"
import {SuggestContainerProps, OtherProps} from "./types"

class SuggestContainer extends React.Component<SuggestContainerProps & OtherProps> {
  fetchSuggests = debounce((prefix: string) => {
    const {fetchSuggest} = this.props
    fetchSuggest(prefix)
  }, 500)

  onSelect = (q: string) => {
    console.log("search phrase:", q)
    const {searchCodepoints} = this.props
    searchCodepoints(q)
  }

  render() {
    const {suggest} = this.props
    const {loading, result} = suggest
    return (
      <TypeAheadSearch
        fetchSuggests={this.fetchSuggests}
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
  searchCodepoints: (q: string) => dispatch(searchCodepoints(q)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestContainer)

export default connected
