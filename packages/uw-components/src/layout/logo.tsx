// tslint:disable:no-any
import * as React from "react"
import * as Styled from "./logo.css"
import {fromCharCode, generateClassName} from "@uw/utils"

// A297 A1CF 11332 1d713
// 18DB
export const Logo: React.SFC<LogoProps> = ({cp = "1d713", style = {}}) => (
  <Styled.Logo className={generateClassName(cp)} style={style}>
    <Styled.Title>{fromCharCode(cp)}</Styled.Title>
  </Styled.Logo>
)
interface LogoProps {
  cp?: string
  style?: any
}

export default Logo
