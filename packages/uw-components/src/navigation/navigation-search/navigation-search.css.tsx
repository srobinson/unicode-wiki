import styled from "../../styled"

export const NavigationSearch = styled("div")`
  background: #0e141f;
  height: 4.5rem;
  left: 0;
  position: fixed;
  top: 0;
  width: 100%;
`

export const InputContainer = styled("div")`
  margin: 0 auto;
  max-width: 72rem;
  position: relative;

  > div {
    background: linear-gradient(#e6e6e6, #ffffff);
    border-radius: 5px;
    border: 1px inset #ccc;
    left: 1rem;
    padding-left: 1.5rem;
    position: absolute;
    top: 1rem;
    width: 80%;

    ::before {
      color: dimgrey;
      content: "\\1F50E";
      font-size: 1.5rem;
      left: 0.5rem;
      position: absolute;
      top: 0.6rem;
    }

    span {
      color: dimgrey;
      cursor: pointer;
      font-size: 1.7rem;
      line-height: 1rem;
      position: absolute;
      right: 0.7rem;
      top: 0.8rem;
      width: 1rem;
    }
  }

  > div > input {
    background: transparent;
    border: 0;
    font-family: "Helvetica Neue", Helvetica, Roboto, Arial, sans-serif;
    font-weight: normal;
    font-size: 16px;
    margin: 2 2rem;
    padding: 0.5rem 1rem;
    width: 100%;

    &:focus {
      outline: "none";
    }
  }
`
