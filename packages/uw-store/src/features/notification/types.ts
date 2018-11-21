export interface Notification {
  feature: string,
  id: number
  message: string
}

export type NotificationState = Notification[]

export const NOTIFICATION = "@@Notification"
export const SET_NOTIFICATION = "SET_NOTIFICATION"
export const REMOVE_NOTIFICATION = "REMOVE_NOTIFICATION"

export const enum NotificationActionTypes {
  NOTIFICATION,
  REMOVE_NOTIFICATION,
  SET_NOTIFICATION,
}
