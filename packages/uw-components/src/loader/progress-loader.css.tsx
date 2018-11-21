import {keyframes} from "react-emotion"
import styled from "../styled"

const progress = keyframes`
  0% {width: 10%}
  40% {width: 55%}
  55% {width: 60%}
  70% {width: 85%}
  80% {width: 90%}
  100% {width: 100%}
`

export const ProgressLoader = styled("div")`
  background: #607d8b;
  height: 4px;
  left: 0;
  position: fixed;
  text-indent: -100vw;
  top: 4.25rem;
  width: 100%;
  z-index: 11;

  animation: ${progress} 2s linear infinite;
`
