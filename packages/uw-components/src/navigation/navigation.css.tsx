// tslint:disable:no-any
import {css, keyframes} from "react-emotion"
import styled from "../styled"

const ExplorerNavigationKeyframes = keyframes`
  0% {
    transform: translateX(15px);
  }
  100% {
    transform: translateX(0);
    opacity: 1;
  }
`

export const ExplorerNavigation = styled("div")`
  font-family: "Helvetica Neue", "Helvetica", "Roboto", "Arial", sans-serif;
  font-size: 0.75em;
  font-weight: 600;
  left: 4.5rem;
  letter-spacing: 2px;
  position: absolute;
  top: 1rem;
  user-select: none;

  @media (max-width: 800px) {
    left: 3.5rem;
  }

  ${(props: any) =>
    (props.reveal &&
      `
    animation: ${ExplorerNavigationKeyframes} 120ms ease-in-out;
  `) ||
    `
    transform: translateX(10px);
    opacity: 0;
    `};
`

export const NavigationCategory = styled("ul")`
  display: inline-block;
  list-style-type: none;
  margin: 0;
  overflow: hidden;
  padding: 0;
  white-space: nowrap;

  width: 100%;
`

export const InnerContainer = styled("li")`
  border-radius: 2px;
  cursor: pointer;
  display: inline-block;
  list-style-type: none;
  margin-right: 4px;
  margin: 0;
  overflow: hidden;
  padding: 0;

  background: var(--explorer-navigation-list-item-background);
  border: var(--explorer-navigation-list-item-border);
  border-color: var(--explorer-navigation-list-item-border-color);
  box-shadow: var(--explorer-navigation-list-item-box-shadow);
  text-shadow: var(--explorer-navigation-list-item-text-shadow);
  color: var(--explorer-navigation-list-item-color);

  will-change: transition;
  transition: all 0.1 linear;
`

export const TypeInnerContainer = styled(InnerContainer)``

export const TitleInnerContainer = styled(InnerContainer)`
  margin-right: 2px;
`

export const NavigationButton = styled("span")`
  display: table-cell;
  font-weight: 900;
  line-height: 3;
  padding: 0 1em;
  text-transform: uppercase;

  ${(props: any) => ({disabled}) =>
    disabled &&
    css`
      background: #000;
      color: #bbb;
      cursor: default;
      opacity: 0.5;
      text-shadow: none;

      &:hover {
      }

      &:active {
      }
    `};

  ${(props: any) => ({disabled}) =>
    !disabled &&
    css`
      &:hover {
        border-color: var(--explorer-navigation-list-item-hover-border-color);
        text-shadow: var(--explorer-navigation-list-item-hover-text-shadow);
      }

      &:active {
        position: relative;
        top: 1px;
        background: var(--explorer-navigation-list-item-ative-background);
        border-color: var(--explorer-navigation-list-item-ative-border-color);
        box-shadow: var(--explorer-navigation-list-item-ative-box-shadow);
        text-shadow: var(--explorer-navigation-list-item-active-text-shadow);
        color: var(--explorer-navigation-list-item-ative-color);
      }
    `};
`

export const CategoryType = styled(NavigationButton)``

export const CategoryTitle = styled(NavigationButton)`
  box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 28vw;

    @media (min-width: 600px) {
      width: 42vw;
    }
  }
`

export const Next = styled(NavigationButton)`
  box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;
`

export const Prev = styled(NavigationButton)``

export const NavigationMenuContainer = styled("div")`
  position: fixed;
  left: 0;
  width: 100vw;
  height: 100vh;
  top: 0;
  overflow-y: scroll;
`

export const NavigationMenu = styled("ul")`
  background: #004050;
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
          margin: 4.5rem auto 0;
        `
      : css`
          margin: -1rem 0 0;
        `};
`

export const MenuItem = styled("li")`
  background: linear-gradient(#003040, #002535);
  border-left: ${(props: any) => (props.active ? "1rem solid tomato" : "0")};
  color: #ddd;
  cursor: pointer;
  display: block;
  list-style-type: none;
  margin: 1px;
  padding: 8px 16px;
  text-transform: uppercase;

  ${(props: any) => ({isNavigationTypeMenuOpen}) =>
    !isNavigationTypeMenuOpen
      ? css`
          position: sticky;
          top: 4.5rem;
        `
      : css``};

  &:hover,
  &:active {
    color: #fff;
  }

  ${(props: any) => ({active, categoryType, isNavigationTypeMenuOpen, level}) =>
    (level > 0 || categoryType === "blocks" || isNavigationTypeMenuOpen) &&
    css`
      background: none;
      border-left: ${active ? "1rem solid tomato" : ".5rem solid #004050"};
      font-size: 0.8rem;
      position: unset;
      text-indent: ${level === 2 ? "10px" : "inherit"};
    `};
`

export const NoResults = styled("div")`
  color: #fff;
  padding: 2rem;
`
