import * as React from "react"
import * as Styled from "./page.css"

export const Page = ({children}: Props) => (
  <Styled.Page>
    <Styled.Container>
      <Styled.Body>
        <Styled.Wrapper>{children}</Styled.Wrapper>
      </Styled.Body>
    </Styled.Container>
  </Styled.Page>
)

type Props = {
  children: React.ReactNode
}

export default Page
