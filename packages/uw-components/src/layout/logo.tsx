import * as React from "react"
import * as Styled from "./logo.css"
import {fromCharCode, generateClassName} from "@uw/utils"

// A297 A1CF 11332
export const Logo: React.SFC<LogoProps> = ({cp = "11332"}) => (
  <Styled.Logo className={generateClassName(cp)}>
    <Styled.Title>{fromCharCode(cp)}</Styled.Title>
  </Styled.Logo>
)
interface LogoProps {
  cp?: string
}

export default Logo
