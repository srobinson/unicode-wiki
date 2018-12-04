// tslint:disable:no-any
import {RouteComponentProps} from "react-router"
import {LoadingState, NotificationState} from "@uw/domain"

export interface PropsFromState {
  loader: LoadingState
  notifications: NotificationState
}

export interface PropsFromDispatch {
  clearNotifications: () => any
}

export interface PathParamsType {
  category: string
  cp: string
  key: string
  urlRange: string
}

export interface OtherProps extends RouteComponentProps<PathParamsType> {}

export type NotificationsProps = PropsFromState & PropsFromDispatch
