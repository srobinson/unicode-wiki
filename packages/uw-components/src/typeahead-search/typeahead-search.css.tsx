// tslint:disable:no-any
import {keyframes} from "react-emotion"
import styled from "../styled"

const TypeAheadSearchKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(15px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

export const TypeAheadSearch = styled("div")`
  background: red;
  position: absolute;
  left: 3.5rem;
  top: 1rem;

  ${(props: any) =>
    (props.reveal &&
      `
    animation: ${TypeAheadSearchKeyframes} 120ms ease-in-out;
  `) ||
    `
    transform: translateX(10px);
    opacity: 0;
    `};
`
