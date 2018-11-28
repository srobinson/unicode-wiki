import {Dispatch, Middleware, MiddlewareAPI} from "redux"
import {API_REQUEST, apiError, apiSuccess} from "../../middleware/api"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchMiddleware: Middleware = ({dispatch}: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  if (action.type.includes(API_REQUEST)) {
    const {meta, type} = action
    const {body, method, url} = meta
    const response = await fetch(`${BASE_URL}${url}`, {
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
    })

    try {
      const payload = await response.json()

      if (response.status >= 400) {
        const error = {
          message: payload,
        }
        dispatch(apiError({error, meta}))
      } else {
        dispatch(apiSuccess({type, payload, meta}))
      }
    } catch (error) {
      dispatch(apiError({error, meta}))
    }
  } else {
    next(action)
  }
}
