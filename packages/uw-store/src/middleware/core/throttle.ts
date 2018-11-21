import {Dispatch, Middleware} from "redux"

const throttled = {}

export const throttleMiddleware: Middleware = () => (next: Dispatch) => action => {
  const time = action.meta && action.meta.throttle

  if (!time) {
    return next(action)
  }

  // Just ignore the action if its already throttled
  if (throttled[action.type]) {
    return
  }

  throttled[action.type] = true

  setTimeout(() => (throttled[action.type] = false), time)

  return next(action)
}
