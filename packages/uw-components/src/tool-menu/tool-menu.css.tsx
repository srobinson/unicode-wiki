// tslint:disable:no-any
import styled from "../styled"
import {Button} from "../button/button.css"

export const ToolMenu = styled("div")`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  right: 8px;
  top: 14px;
  z-index: 5;

  /* @media (min-width: 500px) {
    right: 10px;
  } */
`

export const Tool = styled(Button)``
