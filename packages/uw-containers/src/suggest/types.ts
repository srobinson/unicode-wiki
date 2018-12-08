// tslint:disable:no-any
import {fetchSuggest, searchCodepoints} from "@uw/store"
import {SuggestState} from "@uw/domain"

export interface InstanceState {}

export interface PropsFromState {
  suggest: SuggestState
}

export interface PropsFromDispatch {
  fetchSuggest: typeof fetchSuggest
  searchCodepoints: typeof searchCodepoints
}

export interface OtherProps {}

export type SuggestContainerProps = PropsFromState & PropsFromDispatch
