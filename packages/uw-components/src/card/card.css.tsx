// tslint:disable:no-any
import {css} from "react-emotion"
import styled from "../styled"

export const Card = styled("article")`
  position: relative;
  display: inline-block;
  overflow: hidden;
  font-weight: lighter;
  text-align: center;
  cursor: pointer;
  margin: 0 3px;

  font-size: 4.75vw;
  line-height: 11.5vw;
  width: 11.5vw;

  background: var(--card-background);
  border: var(--card-border);
  box-shadow: var(--card-box-shadow);
  color: var(--card-color);

  border-radius: 4px;
  opacity: 0.8;

  transition: all 0.2s linear;

  @media (min-width: 1152px) {
    font-size: 70px;
    line-height: 140px;
    width: 136px;
  }

  @media (max-width: 1060px) {
    width: 11.7vw;
  }

  @media (max-width: 800px) {
    width: 11.3vw;
  }

  @media (max-width: 600px) {
    width: 11vw;
  }

  @media (max-width: 480px) {
    width: 10.8vw;
  }

  @media (max-width: 414px) {
    width: 10.5vw;
  }

  @media (max-width: 384px) {
    width: 10.3vw;
  }

  @media (max-width: 320px) {
    width: 10vw;
  }

  > div {
    border-radius: 4px;
    display: inline-block;
  }

  > div::before {
    content: "";
    position: absolute;
    z-index: 1;
    border-radius: 4px;
    left: 50%;
    top: 75%;
    width: 1px;
    height: 1px;
    line-height: 0.8;
    border-radius: 50%;
    opacity: 0.5;
    visibility: hidden;

    background: var(--card-inner-background);

    transition: opacity 0.15s linear;
  }

  ${(props: any) =>
    !props.expand &&
    css`
      &:hover {
        /*box-shadow: none;*/
        opacity: 1;
      }

      &:active {
        transition: none;
        box-shadow: none;
        border-color: var(--card-active-border-color);
        opacity: 0.5;
      }

      &:hover > div::before {
        visibility: visible;
        border-radius: 25%;
        transform: scale(200);
        opacity: 0;

        transition: all 0.35s ease-in;
      }
    `};

  ${(props: any) =>
    props.expand &&
    css`
      border: 0;
      cursor: default;
      opacity: 1;
      position: fixed;
      transform: scaleX(50) scaleY(30);
      z-index: 5;

      transition: all 150ms ease-in-out;

      header,
      footer {
        display: none !important;
      }
    `};

  header {
    position: absolute;
    z-index: 2;
    top: 2px;
    left: 0px;
    display: inline-block;

    font-family: helvetica, sans-serif;
    opacity: 0.8;
    width: 70%;
    font-size: 25%;
    line-height: 1.2;
    letter-spacing: 0.1vw;
    text-align: left;
    text-indent: 1vw;

    background: var(--card-header-background);
    color: var(--card-header-color);

    opacity: 0;

    transition: opacity 200ms linear 150ms;

    @media (min-width: 801px) {
      font-size: 17.5219px;
      line-height: 21.0263px;
      width: 59.5781px;
    }
  }

  &:hover header {
    opacity: 0.5;
  }

  section {
    color: var(--card-section-color);
    position: relative;
    user-select: none;
    z-index: 2;
  }

  section:hover {
    opacity: 1;
  }

  section::after {
    content: "\\200B";
  }

  footer {
    display: none;
  }
`

export const Expand = styled("span")`
  ${(props: any) => ({expand}) =>
    expand &&
    css`
      background: red;
      position: fixed;
      width: 100vw;
      height: 100vh;

      left: 50%;
      top: 50%;
      transform: translateX(-50%) translateY(-50%);

      z-index: 10;
    `};
  transition: all 350ms ease-in-out;
`
