import * as React from "react"
// import {NavigationContainer} from "@uw/containers"
// import {Bubbles, Header, Page} from "@uw/components"
// import * as Styled from "./styles.css"
import {loadAsyncImages} from "@uw/utils"

import {Bubbles} from "@uw/components"

export class NotFound extends React.PureComponent {
  componentDidMount() {
    console.log("NotFound::componentDidMount")

    loadAsyncImages()
  }
  render() {
    return <Bubbles />
  }
}
