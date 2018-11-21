import {keyframes} from "react-emotion"
import styled from "../styled"

export const Container = styled("div")`
  display: flex;
  justify-content: center;
  padding: 2rem;
`

const spin = keyframes`
  0%, 100% {
    animation-timing-function: cubic-bezier(0.5, 0, 1, 0.5);
  }
  0% {
    transform: rotateY(0deg);
  }
  50% {
    transform: rotateY(1800deg);
    animation-timing-function: cubic-bezier(0, 0.5, 0.5, 1);
  }
  100% {
    transform: rotateY(3600deg);
  }
`

export const InfinityLoader = styled("div")`
  background: #fff;
  border-radius: 50%;
  display: inline-block;
  height: 31px;
  width: 31px;

  animation: ${spin} 2.4s cubic-bezier(0, 0.2, 0.8, 1) infinite;
`
