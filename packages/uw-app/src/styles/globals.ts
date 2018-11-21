import {css} from "react-emotion"

export default css`
  html {
    height: 100%;
    margin-left: calc(100vw - 100%) !important;
    overflow-y: initial !important;
  }

  html,
  body {
    background: #1b2437;
    height: 100%;
    padding: 0;
    margin: 0;
  }

  .is-locked {
    overflow: hidden;
  }

  html {
    color: #a89e8a;
    font-size: 14px;
    line-height: 1.5em;
    font-family: "Helvetica Neue", Arial, sans-serif;
  }

  body {
    height: 100%;
    overflow-x: hidden;
    width: 100%;
    padding-top: 5rem;
    overflow-y: scroll;
  }

  *,
  ::after,
  ::before {
    /* margin: 0;
    padding: 0; */
    box-sizing: border-box;
  }

  input,
  button,
  textarea,
  select {
    font: inherit;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  input[type="checkbox"] {
    -webkit-appearance: checkbox;
    -moz-appearance: checkbox;
    appearance: checkbox;
  }

  input[type="radio"] {
    -webkit-appearance: radio;
    -moz-appearance: radio;
    appearance: radio;
  }

  ::-webkit-input-placeholder {
    color: #7988a4;
    opacity: 1;
    font-weight: normal;
  }

  :-moz-placeholder {
    color: #7988a4;
    opacity: 1;
    font-weight: normal;
  }

  ::-moz-placeholder {
    color: #7988a4;
    opacity: 1;
    font-weight: normal;
  }

  :-ms-input-placeholder {
    color: #7988a4;
    opacity: 1;
    font-weight: normal;
  }

  button::-moz-focus-inner {
    border: 0;
  }

  ul,
  ol {
    margin-left: 1.5rem;
    margin-bottom: 1.5rem;
  }

  li {
    list-style-type: square;
  }

  blockquote,
  p,
  table {
    margin-bottom: 1.5rem;
  }

  table {
    border-collapse: collapse;
  }

  @media (min-width: 25em) {
    html {
      font-size: 16px;
    }
  }

  @media (min-width: 45em) {
    html {
      font-size: 14px;
    }
  }

  @media (min-width: 60em) {
    html {
      font-size: 16px;
    }
  }

  @media (min-width: 45em) {
    ::-webkit-scrollbar {
      width: 1rem;
      height: 1rem;
      background-color: #1b2437;
    }
    ::-webkit-scrollbar:horizontal {
      border-radius: 0 0 0.5rem 0.5rem;
    }
    ::-webkit-scrollbar-thumb {
      border-radius: 0.5rem;
      background-color: #374051;
      box-shadow: inset 0 0 0 1px #49556c;
      border: 0.2rem solid #1b2437;
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: #465267;
    }
  }
`
