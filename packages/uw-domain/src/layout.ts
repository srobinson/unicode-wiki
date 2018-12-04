export type ThemeColors = "light" | "dark"

export interface LayoutState {
  readonly theme: ThemeColors
}

export interface LoadingState {
  readonly loaders: string[]
  readonly loading: boolean
}

export interface Notification {
  feature: string
  id: number
  message: string
}

export type NotificationState = Notification[]

export const enum NotificationActionTypes {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_NOTIFICATION,
}
