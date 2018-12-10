// tslint:disable:no-any
import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {CodepointDocument, LoadingState, WikiPageState, CodepointState, Codepoint} from "@uw/domain"
import * as wikiActions from "@uw/store"

export interface InstanceState {
  currentCodepoint: CodepointDocument | undefined
}

export interface PropsFromState {
  codepoints: CodepointState
  codepoint: Codepoint | undefined
  cp: string
  loader: LoadingState
  wikiPage: WikiPageState
}

export interface PropsFromDispatch {
  loadWikiPage: typeof wikiActions.loadWikiPage
  push: (path: Path) => RouterAction
}

export interface PathParamsType {}

export interface OtherProps extends RouteComponentProps<PathParamsType> {
  cp: string
}

export type CodepointComponentProps = {}

export type CodepointWikiContainerProps = PropsFromState & PropsFromDispatch
