// tslint:disable:no-any
import {css} from "react-emotion"
import styled from "../styled"

export const LoadingContainer = styled("section")`
  visibility: ${(props: any) => (props.visible ? "visible" : "collapse")};

  transition: opacity 100ms ease-in-out, transform 150ms ease-in-out;

  ${(props: any) => ({loading}) =>
    loading &&
    css`
      cursor: default !important;
      opacity: 0.85;
      transform: scale(0.995);
      pointer-events: none;
    `};

  body[data-animate="out"] & {
    opacity: 0;
    transform: scale(0.995);
    transition: transform 120ms ease-in-out, opacity 120ms ease-in-out;
  }
`
