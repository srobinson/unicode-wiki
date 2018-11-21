// tslint:disable:no-any
import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {CodepointDocument} from "@uw/domain"
import {Loadingstate, WikiPageState} from "@uw/store"
import * as wikiActions from "@uw/store"

export interface InstanceState {
  currentCodepoint: CodepointDocument | undefined
}

export interface PropsFromState {
  loader: Loadingstate
  wikiPage: WikiPageState
}

export interface PropsFromDispatch {
  loadWikiPage: typeof wikiActions.loadWikiPage
  push: (path: Path) => RouterAction
}

export interface PathParamsType {
  category: string
  cp: string
  key: string
  urlRange: string
}

export interface OtherProps extends RouteComponentProps<PathParamsType> {
  codepoint: CodepointDocument
}

export type CodepointComponentProps = {}

export type CodepointWikiContainerProps = PropsFromState & PropsFromDispatch
