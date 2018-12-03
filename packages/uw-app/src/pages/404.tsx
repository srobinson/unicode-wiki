import * as React from "react"
import {NavigationContainer} from "@uw/containers"
import {Header, Page} from "@uw/components"
import * as Styled from "./styles.css"

export const NotFound = () => (
  <React.Fragment>
    <Header>
      <Styled.NavigationBar>
        <NavigationContainer />
      </Styled.NavigationBar>
    </Header>

    <Page>404 NOT FOUND</Page>
  </React.Fragment>
)
