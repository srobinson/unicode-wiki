// tslint:disable:no-any
import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {ApplicationState, suggest} from "@uw/store"
import {SuggestContainerProps, OtherProps, InstanceState} from "./types"

class SuggestContainer extends React.Component<SuggestContainerProps & OtherProps> {
  state: InstanceState = {}

  constructor(props: SuggestContainerProps & OtherProps) {
    super(props)
  }

  static getDerivedStateFromProps(
    nextProps: SuggestContainerProps & OtherProps,
    prevState: InstanceState,
  ) {
    return {}
  }

  render() {
    return <div>...</div>
  }
}

const mapStateToProps = (state: ApplicationState) => ({
  suggest: state.suggest,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  suggest: (prefix: string) => dispatch(suggest(prefix)),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
)(SuggestContainer)

export default connected
