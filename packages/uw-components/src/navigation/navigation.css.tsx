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
  height: 100vh;
  top: 0;
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
  padding: 0;

  ${(props: any) => ({isNavigationTypeMenuOpen}) =>
    !isNavigationTypeMenuOpen
      ? css`
          margin: 8rem auto 0;
        `
      : css`
          margin: -1rem 0 0;
        `};
`

export const MenuItem = styled("li")`
  background: ${(props: any) => (props.active ? "#1b7bbb" : "#0e314d")};
  border-left: ${(props: any) => (props.active ? "1rem solid tomato" : "0")};
  color: #ddd;
  cursor: pointer;
  display: block;
  list-style-type: none;
  margin: 1px;
  padding: 8px 16px;
  text-transform: capitalize;

  ${(props: any) => ({isNavigationTypeMenuOpen}) =>
    !isNavigationTypeMenuOpen
      ? css`
          box-shadow: 0px 0px 1px 1px rgb(0, 0, 0, 0.5);
          padding: 1rem;
          position: sticky;
          top: 8rem;
        `
      : css``};

  &:hover,
  &:active {
    color: #fff;
  }

  &:hover {
    background: ${(props: any) => (props.active ? "#1b7bbb" : "#104469")};
  }

  &:active {
    background: #196ba3;
  }

  ${(props: any) => ({active, categoryType, isNavigationTypeMenuOpen, level}) =>
    (level > 0 || categoryType === "blocks" || isNavigationTypeMenuOpen) &&
    css`
      border-left: ${level === 1 ? ".5rem solid" : "1rem solid"};
      border-left-color: ${active ? "tomato" : level === 1 ? "#114468" : "#114468"};
      font-size: 0.8rem;
      position: unset;
    `};
`

export const NoResults = styled("div")`
  color: #fff;
  padding: 2rem;
`
