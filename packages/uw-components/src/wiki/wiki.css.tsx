// tslint:disable:no-any
import {css} from "react-emotion"
import styled from "../styled"

export const Title = styled("h1")`
  position: absolute;
  left: 5rem;
  top: -0.2rem;

  border: 0;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 1.4rem;
  line-height: 32px;
  right: 0;
  text-transform: uppercase;

  ${(props: any) =>
    props.expand &&
    `
      opacity: 1;
      transform: translateY(0);
    `};

  button {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0.2rem 0.5rem;
    position: absolute;
    right: 1rem;
    top: 6px;
  }

  button:focus {
    outline: 0;
  }
`

export const WikiPage = styled("article")`
  height: 100vh;
  left: 0;
  opacity: 0;
  position: fixed;
  top: 0;
  transform: translateY(10%);
  width: 100%;
  z-index: 1;

  > div {
    opacity: 0;
    transition: opacity 150ms ease-in-out;
  }

  transition: transform 120ms ease-in-out, opacity 150ms ease-in-out;

  ${(props: any) =>
    props.expand &&
    css`
      border: 0;
      cursor: default;
      opacity: 1;
      overflow-y: scroll;
      transform: translateY(0);

      > div {
        background: #fff;
        box-sizing: border-box;
        opacity: 1;
        overflow: hidden;
        margin: 0 auto;
        margin-top: 4rem;
        max-width: 72rem;
        min-height: 100vh;
        padding: 3rem 2rem 3em;
      }
    `};
`
