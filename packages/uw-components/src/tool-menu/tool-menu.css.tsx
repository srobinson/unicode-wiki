// tslint:disable:no-any
import styled from "../styled"

export const ToolMenu = styled("div")`
  display: flex;
  flex-wrap: wrap;
  position: absolute;
  right: 0.5rem;
  top: 1rem;
  z-index: 5;
`

export const Icon = styled("span")`
  font-size: ${(props: any) => (props.active ? "1.2rem" : "1.35rem")};
`
