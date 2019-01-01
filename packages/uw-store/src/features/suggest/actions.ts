import {ApiSearchAction, ApiSearchResponse} from "@uw/domain"
import {CODEPOINTS_SUGGEST} from "@uw/api-graph"
import {SUGGEST, FETCH_SUGGEST, SET_SUGGEST} from "./constants"

export const fetchSuggest = (prefix: string): ApiSearchAction => ({
  meta: {
    feature: SUGGEST,
    method: "GET",
    query: CODEPOINTS_SUGGEST(prefix),
    queryResolver: "suggest",
    success: setSuggest,
  },
  type: FETCH_SUGGEST,
})

export const setSuggest = (action: ApiSearchResponse) => ({
  meta: {feature: SUGGEST},
  payload: action.payload || [],
  type: SET_SUGGEST,
})
