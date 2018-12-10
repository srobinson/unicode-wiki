// tslint:disable:no-any
import {css} from "emotion"
import styled from "../../styled"

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
  @media (max-width: 339px) {
    display: none;
  }

  span {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 20vw;

    @media (min-width: 480px) {
      width: 22vw;
    }

    @media (min-width: 600px) {
      width: 46vw;
    }

    @media (min-width: 1024px) {
      width: 455px;
    }
  }
`

export const Next = styled(NavigationButton)`
  box-shadow: 1px 0px 1px rgba(255, 255, 255, 0.4) inset;
`

export const Prev = styled(NavigationButton)``
