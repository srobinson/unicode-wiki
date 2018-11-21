import {ApiSearchRequest, ApiResponse, ApiError} from "@uw/domain"

export const API_REQUEST = "API_REQUEST"
export const API_SUCCESS = "API_SUCCESS"
export const API_ERROR = "API_ERROR"
export const DATA_NORMALIZED = "DATA_NORMALIZED"

export const apiRequest = ({body, feature, method, purge, url}: ApiSearchRequest) => ({
  meta: {feature, loading: true, method, purge, url},
  payload: body,
  type: `${feature}/${API_REQUEST}`,
})

export const apiSuccess = ({
  data,
  feature,
  purge,
}: {
  data: ApiResponse
  feature: string
  purge?: boolean
}) => ({
  meta: {feature, loading: false, purge},
  payload: data,
  type: `${feature}/${API_SUCCESS}`,
})

export const apiError = ({error, feature}: {error: ApiError; feature: string}) => ({
  meta: {feature, loading: false},
  payload: error,
  type: `${feature}/${API_ERROR}`,
})

export const dataNormalized = ({feature}: {feature: string}) => ({
  meta: {feature},
  type: `${feature}/${DATA_NORMALIZED}`,
})
