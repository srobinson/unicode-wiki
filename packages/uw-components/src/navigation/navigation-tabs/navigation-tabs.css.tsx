import styled from "../../styled"

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
