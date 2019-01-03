// tslint:disable:no-any
import {css, keyframes} from "react-emotion"
import styled from "../styled"

const ExplorerNavigationKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(15px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

export const ExplorerNavigation = styled("div")`
  font-family: "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
  font-size: 0.75em;
  font-weight: 600;
  left: 3.5rem;
  letter-spacing: 2px;
  position: absolute;
  top: 1rem;
  user-select: none;

  ${(props: any) =>
    (props.reveal &&
      `
    animation: ${ExplorerNavigationKeyframes} 120ms ease-in-out;
  `) ||
    `
    transform: translateX(10px);
    opacity: 0;
    `};

  body[data-animate="in"] & {
    animation: ${ExplorerNavigationKeyframes} 120ms ease-in-out;
  }

  body[data-animate="out"] & {
    transform: translateX(15px);
    opacity: 0;
    transition: transform 120ms ease-in, opacity 150ms ease-in 120ms;
  }
`

export const NavigationMenuContainer = styled("div")`
  position: fixed;
  left: 0;
  width: 100vw;
  height: calc(100vh - 8rem);
  top: 8rem;
  overflow-y: scroll;
`

export const NavigationMenu = styled("ul")`
  background: #071f31;
  border: 1px solid #000;
  display: block;
  font-size: ${(props: any) => (props.isNavigationTypeMenuOpen ? "0.8rem" : "1rem")};
  list-style-type: none;
  max-width: 72rem;
  min-height: 100%;
  opacity: 0;
  padding: 0;
  position: relative;
  top: 10px;

  body[data-animate="in"] & {
    transition: opacity 150ms ease-in-out, top 150ms ease-in-out;
    top: 0;
    opacity: 1;
  }

  body[data-animate="nav-out"] & {
    transition: opacity 150ms ease-in-out 150ms, top 150ms ease-in-out 150ms;
    top: 10px;
    opacity: 0;
  }

  ${(props: any) => ({isNavigationTypeMenuOpen}) =>
    !isNavigationTypeMenuOpen
      ? css`
          margin: 0 auto 0;
        `
      : css`
          margin: -1rem 0 0;
        `};
`

export const MenuItem = styled("li")`
  background: ${(props: any) => (props.active ? "#0e314d" : "#0e314d")};
  border-left: ${(props: any) => (props.active ? "1rem solid tomato" : "0")};
  color: #ddd;
  cursor: pointer;
  display: block;
  list-style-type: none;
  margin: 1px;
  padding: 8px 16px;
  text-transform: capitalize;

  ${(props: any) => ({categoryType, level}) =>
    categoryType !== "blocks" &&
    level === 0 &&
    css`
      /* background: #104469; */
      /* box-shadow: 0px 0px 1px 1px rgb(0, 0, 0, 0.5); */
      border-bottom: 1px solid #0e141f;
      border-top: 1px solid #0e141f;
      margin: 1px;
      padding: 1rem;
      position: sticky;
      top: 0;
    `};

  &:hover,
  &:active {
    color: #fff;
  }

  &:active {
    background: #196ba3;
  }

  ${(props: any) => ({active, categoryType, isNavigationTypeMenuOpen, level}) =>
    (level > 0 || categoryType === "blocks" || isNavigationTypeMenuOpen) &&
    css`
      border-left: ${level === 1 ? "1rem solid" : "2rem solid"};
      border-left-color: ${active ? "tomato" : "transparent"};
      font-size: 0.8rem;
      position: unset;
    `};
`

export const NoResults = styled("div")`
  color: #fff;
  padding: 2rem;
`
