// tslint:disable:no-any
import styled from "../styled"

export const Logo = styled("div")`
  cursor: pointer;
  left: 1rem;
  position: absolute;
  user-select: none;
  top: 1rem;

  @media (max-width: 800px) {
    left: 0.35rem;
  }
`

export const Title = styled("h2")`
  background: coral;
  border-radius: 5px;
  color: ${(props: any) => props.theme.colors.headings};
  font-size: 26px;
  font-weight: 500;
  line-height: 26px;
  margin: 0;
  padding: 0.5rem;
  text-shadow: 1px 1px 6px rgb(132, 7, 7);
`
