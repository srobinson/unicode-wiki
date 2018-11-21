import * as React from "react"
import * as Styled from "./logo.css"
import {fromCharCode} from "@uw/utils"

export const Logo: React.SFC = () => (
  <Styled.Logo className="u1f000">
    <Styled.Title>{fromCharCode("1F251")}</Styled.Title>
  </Styled.Logo>
)

export default Logo
