import * as React from "react"
import {connect} from "react-redux"
import {Dispatch} from "redux"
import {withRouter} from "react-router-dom"
import {clearNotifications, ApplicationState} from "@uw/store"
import {NavigationContainer} from "@uw/containers"
import {Bubbles} from "@uw/components"
import {NotificationsProps, OtherProps} from "./types"
import * as Styled from "./not-found.css"

class NotFound extends React.PureComponent<NotificationsProps & OtherProps> {
  render() {
    const {loader, clearNotifications} = this.props
    return (
      <React.Fragment>
        {!loader.loading && (
          <Styled.NotFoundNavigationBar>
            <NavigationContainer cb={clearNotifications} />
          </Styled.NotFoundNavigationBar>
        )}
        <Bubbles />
      </React.Fragment>
    )
  }
}

const mapStateToProps = (state: ApplicationState) => {
  return {
    loader: state.loader,
    notifications: state.notifications,
  }
}

const mapDispatchToProps = (dispatch: Dispatch) => ({
  clearNotifications: () => dispatch(clearNotifications()),
})

const connected = connect(
  mapStateToProps,
  mapDispatchToProps,
  undefined,
  {withRef: true},
)(NotFound)

export default withRouter<OtherProps>(connected)
