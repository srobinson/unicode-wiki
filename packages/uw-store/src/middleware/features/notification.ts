import {Dispatch, Middleware} from "redux"
import {
  Notification,
  removeNotification,
  SET_NOTIFICATION,
  setNotification,
} from "../../features/notification"

export const notificationMiddleware: Middleware = () => (next: Dispatch) => action => {
  if (action.type.includes(SET_NOTIFICATION)) {
    const {payload, meta} = action
    const {message} = payload
    const id = new Date().getMilliseconds()

    const notification: Notification = {
      feature: meta.feature,
      id,
      message,
    }

    // fire a new action with the enriched payload
    // note: the payload is an object
    next(setNotification({message: notification, feature: meta.feature}))

    // dispatch a clear action after a given time
    setTimeout(() => {
      next(removeNotification({notificationId: id, feature: meta.feature}))
    }, 1000)
  } else {
    next(action)
  }
}
