import * as React from "react"
import * as Styled from "./block-title.css"

export const BlockTitle = ({title}: BlockTitleProps) => (
  <Styled.BlockTitle>{title}</Styled.BlockTitle>
)

interface BlockTitleProps {
  key: string
  title: string
}
