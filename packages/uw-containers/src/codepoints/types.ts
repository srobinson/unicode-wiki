// tslint:disable:no-any
import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {CodepointHexRange, CodepointDocument, CodepointState, Loadingstate} from "@uw/domain"
import * as codepointsActions from "@uw/store"

export interface InstanceState {
  currentCard?: string
  currentPage: number
}

export interface PropsFromState {
  codepoints: CodepointState
  loader: Loadingstate
}

export interface PropsFromDispatch {
  fetchCodepoints: typeof codepointsActions.fetchCodepoints
  fetchCodepointsByCategory: typeof codepointsActions.fetchCodepointsByCategory
  followLink: typeof codepointsActions.followLink
  push: (path: Path) => RouterAction
}

export interface PathParamsType {
  category: string
  cp: string
  key: string
  urlRange: string
}

export interface OtherProps extends RouteComponentProps<PathParamsType> {
  cardComponent: any
  loadingComponent: any
  range?: CodepointHexRange
}

export type CodepointComponentProps = {
  codepoint: CodepointDocument
  key: string
}

export type CodepointContainerProps = PropsFromState & PropsFromDispatch
