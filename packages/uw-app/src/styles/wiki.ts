import {css} from "react-emotion"

export default css`
  body {
    color: #222222;
  }

  .wiki table {
    border-collapse: separate !important;
  }

  .wiki *,
  .wiki ::after,
  .wiki ::before {
    box-sizing: content-box;
  }

  .wiki {
    font-size: 18px;
    font-family: sans-serif;
    color: #000;
  }
`
