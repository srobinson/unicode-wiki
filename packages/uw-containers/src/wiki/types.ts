// tslint:disable:no-any
import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {Codepoint, LoadingState, WikiPageState} from "@uw/domain"
import * as wikiActions from "@uw/store"

export interface InstanceState {}

export interface PropsFromState {
  loader: LoadingState
  wikiPage: WikiPageState
}

export interface PropsFromDispatch {
  loadWikiPage: typeof wikiActions.loadWikiPage
  push: (path: Path) => RouterAction
}

export interface PathParamsType {}

export interface OtherProps extends RouteComponentProps<PathParamsType> {
  codepoint: Codepoint
}

export type CodepointComponentProps = {}

export type CodepointWikiContainerProps = PropsFromState & PropsFromDispatch
