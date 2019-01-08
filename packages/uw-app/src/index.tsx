import * as React from "react"
import * as ReactDOM from "react-dom"
import {Provider} from "react-redux"
import {ConnectedRouter} from "connected-react-router"
import {createBrowserHistory} from "history"
import App from "./app"
import {configureStore} from "@uw/store"
import "./config"

// test deploy breaking
const history = createBrowserHistory({
  basename: process.env.PUBLIC_URL,
})
const initialState = window.initialReduxState
const store = configureStore(history, initialState)

const render = (Component: any) => {
  return ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root"),
  )
}

render(App)

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept("./app", () => {
    const NextApp = require("./app").default
    render(NextApp)
  })
}

if (process.env.NODE_ENV !== "development") {
  // registerServiceWorker()
}
