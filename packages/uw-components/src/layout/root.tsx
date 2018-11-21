import * as React from "react"
// import smoke from "./smoke.png"
import * as Styled from "./root.css"

export const Root = ({children}: Props) => (
  <React.Fragment>
    <Styled.Wrapper>{children}</Styled.Wrapper>
    {/* <Styled.Swirl>
      <Styled.Image src={smoke} alt="smoke" />
      <Styled.Image2 src={smoke} alt="smoke" />
    </Styled.Swirl> */}
  </React.Fragment>
)

type Props = {
  className?: string
  children?: React.ReactNode
}

export default Root
