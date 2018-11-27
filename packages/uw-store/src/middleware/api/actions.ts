import {ApiSearchResponse, ApiSearchMetadata, ApiError} from "@uw/domain"

export const API_REQUEST = "API_REQUEST"
export const API_SUCCESS = "API_SUCCESS"
export const API_ERROR = "API_ERROR"
export const DATA_NORMALIZED = "DATA_NORMALIZED"

export const apiRequest = (meta: ApiSearchMetadata) => ({
  meta: {...meta, loading: true},
  type: `${meta.feature}/${API_REQUEST}`,
})

export const apiSuccess = (action: ApiSearchResponse) => ({
  meta: {...action.meta, loading: false},
  payload: action.payload,
  type: `${action.meta.feature}/${API_SUCCESS}`,
})

export const apiError = ({error, meta}: {error: ApiError; meta: ApiSearchMetadata}) => ({
  meta: {...meta, loading: false},
  payload: error,
  type: `${meta.feature}/${API_ERROR}`,
})

export const dataNormalized = ({feature}: {feature: string}) => ({
  meta: {feature},
  type: `${feature}/${DATA_NORMALIZED}`,
})
