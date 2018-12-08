// tslint:disable:no-any
import {Dispatch, Middleware} from "redux"
import {sleep} from "@uw/utils/"

let throttled: any[] = []

export const throttleMiddleware: Middleware = () => (next: Dispatch) => action => {
  const time = action.meta && action.meta.throttle

  if (!time) {
    return next(action)
  }

  console.log("throttled", time)

  throttled.push(action)

  sleep(time)

  console.log("throttled", throttled)

  action = throttled.pop()
  throttled = []
  // setTimeout(() => (throttled[action.type] = false), time)

  return next(action)
}
