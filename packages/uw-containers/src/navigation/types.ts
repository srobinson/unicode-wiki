// tslint:disable:no-any
import {RouterAction} from "connected-react-router"
import {RouteComponentProps} from "react-router"
import {Path} from "history"
import {BlockState, Category, ScriptState, SymbolState, NotificationState} from "@uw/domain"
import {fetchCategory} from "@uw/store"

export interface InstanceState {
  currentCategory: Category | undefined
  categoryList: Category[]
  categoryType: string
  next: string
  prev: string
}

export interface PropsFromState {
  blocks: BlockState
  notifications: NotificationState
  scripts: ScriptState
  symbols: SymbolState
}

export interface PropsFromDispatch {
  fetchCategory: typeof fetchCategory
  push: (path: Path) => RouterAction
}

export interface PathParamsType {
  category: string
  key: string
  urlRange: string
}

export interface OtherProps extends RouteComponentProps<PathParamsType> {}

export type NavigationContainerProps = PropsFromState & PropsFromDispatch
