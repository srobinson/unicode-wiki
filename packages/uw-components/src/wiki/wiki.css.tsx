// tslint:disable:no-any
import {css} from "react-emotion"
import styled from "../styled"

export const Title = styled("h1")`
  position: absolute;
  left: 4.5rem;
  top: -0.2rem;
  right: 5rem;
  min-width: 0;

  border: 0;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 1.4rem;
  line-height: 32px;
  right: 0;
  text-transform: uppercase;

  @media (max-width: 800px) {
    left: 3.5rem;
  }

  ${(props: any) =>
    props.expand &&
    `
      opacity: 1;
      transform: translateY(0);
    `};

  span {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
    margin-right: 4rem;
  }

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
    > div {
      margin-bottom: 3rem;
    }
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
export const Message = styled("div")`
  background: #eee;
  padding: 2rem;
`
export const SearchHits = styled("div")``

export const SearchHit = styled("div")`
  margin: 0.5rem 1rem;
  a {
    display: block;
    font-size: 1.2rem;
    margin-top: 1.5rem;
  }

  blockquote {
    background: #fff;
    border: 1px solid #ccc;
    box-shadow: 1px 1px 1px 1px rgb(0, 0, 0, 0.1);
    cursor: initial;
    margin: 0.2rem 0 1rem;
    padding: 1rem;
  }
`
