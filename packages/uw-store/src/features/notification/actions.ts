import {Notification} from "@uw/domain"
import {CLEAR_NOTIFICATIONS, REMOVE_NOTIFICATION, SET_NOTIFICATION} from "./constants"

export const setNotification = ({message, feature}: {message: Notification; feature: string}) => ({
  meta: {feature},
  payload: message,
  type: `${feature}/${SET_NOTIFICATION}`,
})

export const removeNotification = ({
  notificationId,
  feature,
}: {
  notificationId: number
  feature: string
}) => ({
  meta: {feature},
  payload: notificationId,
  type: `${feature}/${REMOVE_NOTIFICATION}`,
})

export const clearNotifications = () => ({
  type: CLEAR_NOTIFICATIONS,
})
