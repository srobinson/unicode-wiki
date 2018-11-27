import {Notification} from "@uw/domain"
import {REMOVE_NOTIFICATION, SET_NOTIFICATION} from "./constants"

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
