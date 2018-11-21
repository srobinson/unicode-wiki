import styled from "../styled"

export const Header = styled("header")`
  background: #0e141f;
  border-bottom: 1px solid #29303d;
  box-shadow: 0 1rem 5rem -0.5rem #000;
  height: 4.5rem;
  left: calc(100vw - 100%);
  position: fixed;
  transform: translateZ(0);
  top: 0;
  width: 100%;
  z-index: 3;
`

export const HeaderInner = styled("div")`
  height: 100%;
  margin: 0 auto;
  max-width: 72rem;
  position: relative;
`
