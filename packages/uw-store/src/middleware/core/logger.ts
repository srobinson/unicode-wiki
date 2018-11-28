// tslint:disable:no-console
import {Dispatch, Middleware, MiddlewareAPI} from "redux"

export const loggerMiddleware: Middleware = ({getState}: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (process.env.NODE_ENV === "development") {
    // console.group(`${action.type}`)
    // console.group("CURRENT STATE:")
    // console.log(getState())
    console.log("loggerMiddleware::action", action.type)
    next(action)
    // console.group("NEXT STATE: ")
    // console.log(getState())
    // console.groupEnd()
    // console.groupEnd()
  } else {
    next(action)
  }
}
