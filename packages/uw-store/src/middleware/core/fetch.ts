import {Dispatch, Middleware, MiddlewareAPI} from "redux"
import {apolloClient} from "@uw/graphql"
import {API_REQUEST, apiError, apiSuccess} from "../../middleware/api"

const BASE_URL = process.env.REACT_APP_API_BASE_URL

export const fetchMiddleware: Middleware = ({dispatch}: MiddlewareAPI) => (
  next: Dispatch,
) => async action => {
  next(action)

  if (action.type.includes(API_REQUEST)) {
    const {meta, type} = action
    const {body, method, query, queryResolver, url} = meta

    if (query) {
      const response = await apolloClient.query({query})
      try {
        const payload = await response.data[queryResolver]
        if (response.errors) {
          const error = {
            message: response,
          }
          dispatch(apiError({error, meta}))
        } else {
          dispatch(apiSuccess({type, payload: payload, meta}))
        }
      } catch (error) {
        dispatch(apiError({error, meta}))
      }

      // console.log("response>>>", response)
    } else {
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
    }
  }
}
