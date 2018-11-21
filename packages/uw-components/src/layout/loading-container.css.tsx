// tslint:disable:no-any
import {css} from "react-emotion"
import styled from "../styled"

export const LoadingContainer = styled("section")`
  transition: opacity ease-in-out 100ms, transform ease-in-out 150ms;
  visibility: ${(props: any) => (props.visible ? "visible" : "collapse")};
  ${(props: any) => ({loading}) =>
    loading &&
    css`
      cursor: default !important;
      opacity: 0.85;
      transform: scale(0.995);
      pointer-events: none;
    `};
`
