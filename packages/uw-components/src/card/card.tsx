import * as React from "react"
import {CodepointDocument} from "@uw/domain"
import {fromCharCode} from "@uw/utils"
import * as Styled from "./card.css"

type Props = {
  codepoint: CodepointDocument
  onClick: () => void
}

export class Card extends React.PureComponent<Props> {
  render() {
    const {codepoint, onClick} = this.props
    return (
      <React.Fragment>
        <Styled.Card className={codepoint["font"]} onClick={onClick}>
          <div>
            <header>{codepoint.cp}</header>
            <section>{fromCharCode(codepoint.cp)}</section>
            <footer>OPTIONS</footer>
          </div>
        </Styled.Card>
      </React.Fragment>
    )
  }
}
