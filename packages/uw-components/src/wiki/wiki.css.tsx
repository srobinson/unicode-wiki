// tslint:disable:no-any
import styled from "../styled"

export const Title = styled("h1")`
  border: 0;
  color: #fff;
  font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
  font-size: 1.4rem;
  height: 3rem;
  left: 4.5rem;
  line-height: 32px;
  min-width: 0;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  top: 0.6rem;

  @media (max-width: 800px) {
    left: 3.5rem;
  }

  span {
    display: block;
    margin-right: 4rem;
    opacity: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    transform: translateX(20px);
    white-space: nowrap;

    transition: transform 150ms ease-in-out, opacity 75ms linear 75ms;

    body[data-animate="in"] & {
      opacity: 1;
      transform: translateX(0);
    }

    body[data-animate="out"] & {
      opacity: 0;
      transform: translateX(20px);
    }
  }

  button {
    background: transparent;
    border: 1px solid #fff;
    color: #fff;
    cursor: pointer;
    margin-right: 0.5rem;
    padding: 0 0.5rem;
    position: absolute;
    right: 1rem;
    top: 0;
  }

  button:focus {
    outline: 0;
  }
`

export const CodepointContainer = styled("div")`
  background: linear-gradient(
      0deg,
      rgba(255, 0, 102, 0) 20%,
      rgba(255, 0, 102, 0.0980392) 20%,
      rgba(255, 0, 102, 0.0980392) 40%,
      rgba(255, 0, 102, 0.2) 40%,
      rgba(255, 0, 102, 0.2) 60%,
      rgba(255, 0, 102, 0.4) 60%,
      rgba(255, 0, 102, 0.4) 80%,
      rgba(255, 0, 102, 0.6) 80%
    ),
    linear-gradient(
      -90deg,
      rgba(255, 0, 102, 0) 20%,
      rgba(255, 0, 102, 0.0980392) 20%,
      rgba(255, 0, 102, 0.0980392) 40%,
      rgba(255, 0, 102, 0.2) 40%,
      rgba(255, 0, 102, 0.2) 60%,
      rgba(255, 0, 102, 0.4) 60%,
      rgba(255, 0, 102, 0.4) 80%,
      rgba(255, 0, 102, 0.6) 80%
    ),
    rgb(255, 204, 0);
  background-position: auto auto;
  background-origin: padding-box;
  background-clip: border-box;
  background-size: cover;
  padding: 2rem 0 5rem;
  position: relative;
  margin-left: -4rem;
  margin-bottom: 0;
  right: -2rem;
  top: -2.5rem;
`

export const Codepoint = styled("div")`
  background: #fff;
  border-radius: 50%;
  border: 20px solid #eee;
  color: #000;
  font-size: 30vw;
  font-weight: bold;
  height: 40vw;
  line-height: 40vw;
  margin: 0 auto;
  text-align: center;
  text-shadow: 2px 4px 10px rgb(0, 0, 0, 0.3);
  width: 40vw;

  @media (min-width: 1024px) {
    font-size: 300px;
    height: 400px;
    line-height: 400px;
    width: 400px;
  }
`

export const WikiPage = styled("article")`
  border: 0;
  color: #000;
  cursor: default;
  height: 100vh;
  left: 0;
  margin: 0;
  opacity: 0;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  transform: scale(0.9);
  width: 100%;
  z-index: 1;

  > div {
    background: #fff;
    box-sizing: border-box;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 4rem;
    max-width: 72rem;
    min-height: 100vh;
    padding: 3rem 2rem 3em;
  }

  body[data-animate="in"] & {
    opacity: 1;
    transform: scale(1);
    transition: transform 120ms ease-in-out 120ms, opacity 150ms ease-in-out 120ms;
  }

  body[data-animate="out"] & {
    opacity: 0;
    transform: scale(0.9);
    transition: transform 120ms ease-in, opacity 150ms ease-in;
  }
`

export const Iframe = styled("iframe")`
  border: 0;
  overflow: hidden;
  width: 100%;
`

export const Message = styled("div")`
  background: #eee;
  margin-bottom: 3rem;
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
