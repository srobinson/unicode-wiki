import * as React from "react"
import {withRouter, RouteComponentProps} from "react-router-dom"
import {ThemeProvider} from "emotion-theming"
import {History} from "history"
import {connect} from "react-redux"
import {Store} from "redux"
import Routes from "routes"
import {ApplicationState, ThemeColors} from "@uw/store"
import * as themes from "styles/theme"
import "styles"

class App extends React.Component<Props> {
  public render() {
    const {theme} = this.props

    return (
      <ThemeProvider theme={themes[theme]}>
        <Routes />
      </ThemeProvider>
    )
  }
}

const mapStateToProps = ({layout}: ApplicationState) => ({
  theme: layout.theme,
})

const connected = connect<PropsFromState, PropsFromDispatch, OwnProps, ApplicationState>(
  mapStateToProps,
)(App)

export default withRouter<OwnProps>(connected)

type Props = PropsFromState & PropsFromDispatch & OwnProps

interface PropsFromState {
  theme: ThemeColors
}

interface PropsFromDispatch {
  [key: string]: any
}

export interface PathParamsType {
  category: string
  key: string
  urlRange: string
}

interface OwnProps extends RouteComponentProps<PathParamsType> {
  store: Store<ApplicationState>
  history: History
}
