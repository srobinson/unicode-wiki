import {injectGlobal} from "react-emotion"
import globals from "./globals"
import normalize from "./normalize"
import "./theme.css"

// tslint:disable-next-line:no-unused-expression
injectGlobal`
  ${normalize}
  ${globals}
`
