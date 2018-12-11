import {ButtonProps} from "./types"
import styled from "../styled"

export const Button = styled("button")`
  /* border-radius: ${({active}: ButtonProps) => (active ? "0" : "50%")}; */
  background: ${({active}: ButtonProps) => (active ? "#1b7bbb" : "#0a253b")};
  border-radius: 50%;
  border: ${({active}: ButtonProps) => (active ? "0" : "1px solid #000")};
  color: #fff;
  cursor: pointer;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 1.3rem;
  font-weight: normal;
  height: 2.6rem;
  line-height: 2.6rem;
  margin: 0 2px;
  width: 2.6rem;

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
