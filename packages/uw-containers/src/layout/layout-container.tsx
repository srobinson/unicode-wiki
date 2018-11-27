import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {ThemeColors} from "@uw/domain"
import {ApplicationState, setTheme} from "@uw/store"
import {LayoutContainerProps, OtherProps} from "./types"

class LayoutContainer extends React.Component<LayoutContainerProps & OtherProps> {
  public render() {
    const {children, ...rest} = this.props

    return children({...rest})
  }
}

const mapStateToProps = ({layout}: ApplicationState) => ({
  theme: layout.theme,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
  setTheme: (theme: ThemeColors) => dispatch(setTheme(theme)),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LayoutContainer)
