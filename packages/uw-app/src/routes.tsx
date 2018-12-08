import * as React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Root} from "@uw/components"
import NotFound from "./pages/not-found"
import ExplorerPage from "./pages/explorer"

const Routes: React.SFC = () => (
  <Root>
    <Switch>
      <Redirect path="/" exact to="/c/blocks/basic-latin" />
      <Route path="/c/:category/:key?/:cp?" component={ExplorerPage} />
      <Route path="/search/:q?" component={ExplorerPage} />
      <Route component={NotFound} />
    </Switch>
  </Root>
)

export default Routes
