// tslint:disable
import {Theme} from "../styled"
import brandColors from "../colors/brandColors"
import {darken} from "polished"

const lightTheme: Theme = {
  colors: {
    background: "#1b2437",
    body: "#a89e8a",
    headings: brandColors.white,
    black: brandColors.black,
    white: brandColors.white,
    borders: darken(0.05, brandColors.gray5),
    tableOdd: darken(0.025, brandColors.gray5),
    brand: "#084083",
    attrs: {
      str: "#f44336",
      agi: "#39d402",
      int: "#01a9f4",
    },
  },
  fonts: {
    headings:
      "'IBM Plex Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
    body:
      "-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif",
    monospace:
      "'IBM Plex Mono', Menlo, Monaco, Consolas, Liberation Mono, Courier New, monospace, monospace",
  },
  fontSizes: {
    h1: "2.441rem",
    h2: "1.953rem",
    h3: "1.563rem",
    h4: "1.25rem",
  },
  containerPadding: "1.5rem",
  breakpoints: {
    xs: "0px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px",
  },
  widths: {
    md: "720px",
    lg: "960px",
    xl: "1140px",
  },
  heights: {
    header: "60px",
  },
}

export default lightTheme
