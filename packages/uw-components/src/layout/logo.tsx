import * as React from "react"
import * as Styled from "./logo.css"
import {fromCharCode, generateClassName} from "@uw/utils"

export const Logo: React.SFC<LogoProps> = ({cp = "1F251"}) => (
  <Styled.Logo className={generateClassName(cp)}>
    <Styled.Title>{fromCharCode(cp)}</Styled.Title>
  </Styled.Logo>
)
interface LogoProps {
  cp?: string
}

export default Logo
