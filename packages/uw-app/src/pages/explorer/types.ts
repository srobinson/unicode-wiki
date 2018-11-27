import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {WikiPageState} from "@uw/domain"

export interface PropsFromState {
  wikiPage: WikiPageState
}

export interface PropsFromDispatch {
  push: (path: Path) => RouterAction
}

export interface PathParamsType {
  category: string
  cp: string
  key: string
  urlRange: string
}

export interface OtherProps extends RouteComponentProps<PathParamsType> {}

export type WikiPageProps = PropsFromState & PropsFromDispatch
