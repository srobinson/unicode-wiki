import styled from "../styled"
import {ButtonProps} from "./types"

export const Button = styled("button")`
  background: ${(props: ButtonProps) => (props.active ? "#1b7bbb" : "#0a253b")};
  border: 0;
  color: #fff;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;
  height: 32px;
  margin: 0 2px;
  width: 32px;
  &:focus {
    outline: "none";
  }
  &:hover {
    background: ${(props: ButtonProps) => (props.active ? "#1b7bbb" : "#0e314d")};
  }
  &:active {
    background: #1b7bbb;
  }
`
