// import {css, keyframes} from "react-emotion"
import styled from "../styled"

export const NavigationSearch = styled("div")`
  background: #0e141f;
  height: 4.5rem;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

export const InputContainer = styled("div")`
  margin: 0 auto;
  max-width: 72rem;
  position: relative;

  > div {
    background: linear-gradient(#e6e6e6, #ffffff);
    border: 1px inset #ccc;
    border-radius: 5px;
    position: absolute;
    top: 1rem;
    width: 80%;

    ::before {
      content: "\\F349";
    }
  }

  > div > input {
    background: transparent;
    border: 0;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    font-weight: normal;
    font-size: 16px;
    margin: 2 2rem;
    padding: 0.5rem 1rem;
    width: 100%;

    &:focus {
      outline: "none";
    }
  }
`
