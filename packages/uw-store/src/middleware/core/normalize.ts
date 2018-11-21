import {Dispatch, Middleware, MiddlewareAPI} from "redux"
import {dataNormalized} from "../../middleware/api"

export const normalizeMiddleware: Middleware = ({dispatch}: MiddlewareAPI) => (
  next: Dispatch,
) => action => {
  if (
    action.type.includes("SET") &&
    action.meta &&
    action.meta.normalizeKey &&
    Array.isArray(action.payload)
  ) {
    // notify about the transformation
    dispatch(dataNormalized({feature: action.meta.feature}))

    // const normalizedKey = action.meta.normalizeKey

    // transform the data structure
    // tslint:disable-next-line:no-any
    action.payload = action.payload.reduce((acc: {}, item: any) => {
      acc[item[action.meta.normalizeKey || "_id"]] = item
      return acc
    }, {})

    action.normalizeKey = undefined
  }
  next(action)
}
