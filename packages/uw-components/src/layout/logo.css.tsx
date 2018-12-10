// tslint:disable:no-any
import styled from "../styled"

export const Logo = styled("div")`
  cursor: pointer;
  left: 0.35rem;
  position: absolute;
  user-select: none;
  top: 1rem;

  @media (max-width: 800px) {
    /* left: 0.35rem; */
  }
`

export const Title = styled("h2")`
  background: coral;
  border-radius: 5px;
  color: #ffffff;
  font-size: 1.75rem;
  line-height: 2.75rem;
  text-shadow: 1px 1px 6px rgb(132, 7, 7);
  width: 2.75rem;
  text-align: center;
  margin: 0;
  padding: 0;
`
