import {Dispatch, Middleware} from "redux"

export const actionSplitterMiddleware: Middleware = () => (next: Dispatch) => action => {
  if (Array.isArray(action)) {
    action.forEach(a => next(a))
  } else {
    next(action)
  }
}
