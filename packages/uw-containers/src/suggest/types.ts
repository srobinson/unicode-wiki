// tslint:disable:no-any
import {suggest} from "@uw/store"

export interface InstanceState {}

export interface PropsFromState {}

export interface PropsFromDispatch {
  suggest: typeof suggest
}

export interface OtherProps {}

export type SuggestContainerProps = PropsFromState & PropsFromDispatch
