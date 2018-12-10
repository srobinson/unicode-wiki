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
  margin: -8px auto 0;
  max-width: 72rem;
  position: relative;
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
  width: 82px;

  @media (min-width: 500px) {
    font-size: 1rem;
    height: 46px;
    padding: 3px 1rem;
    width: 26vw;
  }

  @media (min-width: 72rem) {
    width: 266px;
  }
`

export const Cancel = styled(Button)`
  position: relative;
  top: 2px;
`
