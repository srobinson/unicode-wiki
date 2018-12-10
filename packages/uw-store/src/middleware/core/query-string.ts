import {Dispatch, Middleware} from "redux"
import {stringToObject} from "@uw/utils"

const DEFAULT_LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

export const queryStringMiddleware: Middleware = () => (next: Dispatch) => action => {
  if (action.type === DEFAULT_LOCATION_CHANGE) {
    const search = action.payload.location.search
    let query = {}
    if (search) {
      query = stringToObject(search.split("?")[1])
    }
    Object.assign(action.payload.location, {
      query,
    })
  }
  return next(action)
}
