import {ApiSearchAction, Link, PaginatedCodepointResult, ApiSearchResponse} from "@uw/domain"
import {CODEPOINTS, FETCH_CODEPOINTS, SET_CODEPOINTS} from "./constants"

export const followLink = (link: Link): ApiSearchAction => ({
  meta: {
    feature: CODEPOINTS,
    method: "GET",
    success: setCodepoints,
    url: link.href.replace("/api", ""),
  },
  type: FETCH_CODEPOINTS,
})

export const fetchCodepoints = (range?: string, search?: string): ApiSearchAction => ({
  meta: {
    feature: CODEPOINTS,
    method: "GET",
    success: setCodepoints,
    url: `/codepoints/${range || undefined}${search}`,
  },
  type: FETCH_CODEPOINTS,
})

export const fetchCodepointsByCategory = (
  category: string,
  key: string,
  search?: string,
): ApiSearchAction => {
  // convert plural to singular
  // eg: scripts => script
  category = category.substr(0, category.length - 1)
  return {
    meta: {
      feature: CODEPOINTS,
      method: "GET",
      purge: true,
      success: setCodepoints,
      url: `/${category}/${key}/codepoints${search}`,
    },
    type: FETCH_CODEPOINTS,
  }
}

export const setCodepoints = (action: ApiSearchResponse) => ({
  meta: {feature: CODEPOINTS, purge: action.meta.purge},
  payload: <PaginatedCodepointResult>action.payload,
  type: SET_CODEPOINTS,
})
