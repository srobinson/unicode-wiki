import styled from "styles/styled"

export const Navigation = styled("div")`
  position: absolute;
  left: 4.5rem;
  top: 1rem;
`

export const Explorer = styled("div")``

export const CategoryHeader = styled("header")`
  background: #ffffff;
  border-bottom: 1px solid #29303d;
  height: 2.5rem;
  position: fixed;
  top: 4.5rem;
  width: 100%;
  z-index: 3;
`
export const CurrentTheme = styled("span")`
  margin-right: 1rem;
`

export const ThemeSwitcherButton = styled("button")`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  border: 1px solid ${props => props.theme.colors.white};
  border-radius: 3px;
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.brand};
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: transparent;
    color: ${props => props.theme.colors.white};
  }
`
