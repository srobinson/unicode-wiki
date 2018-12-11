import styled from "../../styled"
import {Button} from "../../button/button.css"

export const NavigationTabs = styled("div")`
  background: #0e141f;
  height: 3.5rem;
  margin-left: -2px;
  padding: 2px 0.5rem;
  position: fixed;
  text-transform: uppercase;
  top: 4.5rem;
  width: 72.2rem;
  z-index: 2;
`
export const InnerContainer = styled("div")`
  margin: 2px auto 0;
  margin-left: 20px;
  max-width: 72rem;
  opacity: 0;
  position: relative;

  body[data-animate="in"] & {
    transition: opacity 150ms ease-in-out 150ms, margin-left 150ms ease-in-out 150ms;
    margin-left: 0;
    opacity: 1;
  }

  body[data-animate="nav-out"] & {
    transition: opacity 150ms ease-in-out, margin-left 150ms ease-in-out;
    margin-left: 20px;
    opacity: 0;
  }
`
export const Tab = styled(Button)`
  border-radius: 5px;
  display: inline-block;
  font-size: 12px;
  height: 36px;
  line-height: 36px;
  margin: 0 2px;
  padding: 0 12px;
  text-transform: uppercase;
  width: 26vw;

  @media (min-width: 1024px) {
    width: 266px;
  }

  /* @media (min-width: 500px) {
    font-size: 1rem;
    height: 38px;
    padding: 3px 1rem;
    width: 26vw;
  }

  @media (min-width: 72rem) {
    height: 42px;
    width: 266px;
  } */
`

export const Cancel = styled(Button)`
  position: relative;
  top: 2px;
`
