import {ButtonProps} from "./types"
import styled from "../styled"

export const Button = styled("button")`
  background: ${({active}: ButtonProps) => (active ? "#1b7bbb" : "#0a253b")};
  border: ${({active}: ButtonProps) => (active ? "0" : "1px solid #000")};
  /* border-radius: ${({active}: ButtonProps) => (active ? "0" : "50%")}; */
  border-radius: 50%;
  color: #fff;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 16px;
  font-weight: normal;
  height: 48px;
  line-height: 48px;
  margin: 0 2px;
  width: 48px;
  &:focus {
    outline: "none";
  }
  &:hover {
    background: ${({active}: ButtonProps) => (active ? "#1b7bbb" : "#0e314d")};
  }
  &:active {
    background: #1b7bbb;
  }
`
