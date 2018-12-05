import {ApiSearchAction, ApiSearchResponse} from "@uw/domain"
import {SUGGEST, FETCH_SUGGEST, SET_SUGGEST} from "./constants"

export const suggest = (prefix: string): ApiSearchAction => ({
  meta: {
    feature: SUGGEST,
    method: "GET",
    success: setSuggest,
    url: `/codepoints/suggest/{prefix}`,
  },
  type: FETCH_SUGGEST,
})

export const setSuggest = (action: ApiSearchResponse) => ({
  meta: {feature: SUGGEST},
  payload: action.payload || [],
  type: SET_SUGGEST,
})
