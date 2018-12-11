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

export const Tab = styled(Button)`
  border-radius: 5px;
  display: inline-block;
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  margin: 0 2px;
  padding: 0 12px;
  text-transform: uppercase;
  width: 26vw;

  @media (min-width: 1024px) {
    width: 266px;
  }

  /* @media (min-width: 500px) {
    font-size: 1rem;
    height: 38px;
    padding: 3px 1rem;
    width: 26vw;
  }

  @media (min-width: 72rem) {
    height: 42px;
    width: 266px;
  } */
`

export const Cancel = styled(Button)`
  position: relative;
  top: 2px;
`
