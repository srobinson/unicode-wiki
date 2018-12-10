import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {fetchSuggest, searchCodepoints} from "@uw/store"
import {SuggestState} from "@uw/domain"

export interface InstanceState {}

export interface PropsFromState {
  suggest: SuggestState
}

export interface PropsFromDispatch {
  fetchSuggest: typeof fetchSuggest
  push: (path: Path) => RouterAction
  searchCodepoints: typeof searchCodepoints
}

export interface PathParamsType {}

export interface OtherProps extends RouteComponentProps<PathParamsType> {}

export type SuggestContainerProps = PropsFromState & PropsFromDispatch
