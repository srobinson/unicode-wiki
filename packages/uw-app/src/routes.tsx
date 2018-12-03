import * as React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import {Root} from "@uw/components"
import {NotFound} from "./pages"
import ExplorerPage from "./pages/explorer"
import {isHex} from "@uw/utils"

const Routes: React.SFC = () => (
  <Root>
    <Switch>
      <Redirect path="/" exact to="/c/blocks/basic-latin" />
      <Route
        path="/c/:category/:key?/:cp?"
        render={({match}) => {
          const cp = match.params.cp
          if (!cp || isHex(match.params.cp)) {
            return <ExplorerPage />
          }
          return <NotFound />
        }}
      />
      <Route component={NotFound} />
    </Switch>
  </Root>
)

export default Routes
