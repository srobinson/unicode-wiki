// tslint:disable:no-any
import {keyframes} from "react-emotion"
import {css as emoCSS} from "emotion"
import styled from "../styled"
import {InfinityLoader} from "../loader/infinity-loader.css"

export const css = (...args: []) => ({className: emoCSS(...args)})

const TypeAheadSearchKeyframes = keyframes`
  0% {
    opacity: 0;
    transform: translateX(15px);
  }
  100% {
    opacity: 1;
    transform: translateX(0);
  }
`

export const TypeAheadSearch = styled("div")`
  position: absolute;
  left: 3.5rem;
  top: 1rem;
  width: 56vw;

  @media (min-width: 600px) {
    width: 66vw;
  }

  @media (min-width: 1024px) {
    width: 636px;
  }

  ${(props: any) =>
    (props.reveal &&
      `
    animation: ${TypeAheadSearchKeyframes} 120ms ease-in-out;
  `) ||
    `
    transform: translateX(10px);
    opacity: 0;
    `};
`

export const Loader = styled(InfinityLoader)`
  background: #ccc;
  height: 14px;
  left: 6px;
  padding: 0;
  position: absolute;
  top: 12px;
  width: 14px;
  z-index: 3;
`

export const BaseMenu = styled("ul")`
  background-color: white;
  border-bottom-width: 1;
  border-color: #96c8da;
  border-left-width: 1;
  border-radius: 0 0 0.28571429rem 0.28571429rem;
  border-right-width: 1;
  border-style: solid;
  border-top-width: 0;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  margin: 0;
  max-height: 75vh;
  outline: 0;
  overflow-x: hidden;
  overflow-y: auto;
  padding: 0;
  position: absolute;
  transition: opacity 0.1s ease;
  width: 100%;
  border: none;
`

export const Item = styled("li")`
  border: none;
  border-top: none;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.87);
  cursor: pointer;
  display: block;
  font-size: 1rem;
  font-weight: 400;
  height: auto;
  line-height: 1rem;
  padding: 0.5rem 0.9rem;
  position: relative;
  text-align: left;
  text-transform: none;
  white-space: normal;
  word-wrap: normal;

  ${(props: any) => {
    if (props.isActive) {
      return emoCSS`
      color: rgba(0,0,0,.95);
      background: rgba(0,0,0,.03);
    `
    }
    if (props.isSelected) {
      return emoCSS`
        color: rgba(0,0,0,.95),
        font-Weight: 700,
    `
    }
    return
  }};
`

export const Input = styled("input")`
  background: #fff;
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 0.3rem;
  box-shadow: none;
  color: rgba(0, 0, 0, 0.87);
  display: inline-block;
  font-size: 14;
  line-height: 1.5em;
  min-height: 2em;
  outline: 0;
  padding: 0.5rem 2rem 0.5rem 0.5rem;
  transition: box-shadow 0.1s ease, width 0.1s ease;
  white-space: normal;
  width: 100%;
  word-wrap: break-word;

  &:hover,
  &:active {
    border-color: #96c8da;
    box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  }

  ${(props: any) =>
    props.isOpen &&
    emoCSS`
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
      &:hover,
      &:active: {
        box-shadow: none;
      }
    `};
`

export const Label = styled("label")`
  display: block;
  font-weight: bold;
  margin-bottom: 10;
`

export const ControllerButton = styled("button")`
  align-items: center;
  background-color: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 47;
`
