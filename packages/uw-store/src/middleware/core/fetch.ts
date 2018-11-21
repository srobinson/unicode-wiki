import {Dispatch, Middleware, MiddlewareAPI} from "redux"
import {API_REQUEST, apiError, apiSuccess} from "../../middleware/api"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchMiddleware: Middleware = ({dispatch}: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  next(action)

  if (action.type.includes(API_REQUEST)) {
    let {body, feature, method, purge, url} = action.meta
    const response = await fetch(`${BASE_URL}${url}`, {
      body: JSON.stringify(body),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method,
    })

    try {
      const data = await response.json()

      if (response.status >= 400) {
        const error = {
          message: data,
        }
        dispatch(apiError({error, feature}))
      } else {
        dispatch(apiSuccess({data, feature, purge}))
      }
    } catch (error) {
      dispatch(apiError({error, feature}))
    }
  }
}
