import {CODEPOINTS_SEARCH, CODEPOINTS_BY_CATEGORY_KEY} from "@uw/api-graph"
import {
  ApiSearchAction,
  InternalException,
  Link,
  PaginatedCodepointResult,
  ApiSearchResponse,
} from "@uw/domain"
import {CODEPOINTS, FETCH_CODEPOINTS, SET_CODEPOINTS} from "./constants"

export const followLink = (link: Link): ApiSearchAction => {
  const parts = link.href.match(
    /\/api\/(symbol|script|block)\/([a-z-]+)\/codepoints\?page=([0-9]+)/,
  )
  if (!parts) {
    throw new InternalException(new Error(`Cannot match parts for ${link}`))
  }
  return fetchCodepointsByCategory(parts[1], parts[2], Number.parseInt(parts[3], 10))
}

export const searchCodepoints = (q: string): ApiSearchAction => ({
  meta: {
    feature: CODEPOINTS,
    method: "GET",
    purge: true,
    query: CODEPOINTS_SEARCH(q),
    queryResolver: "search",
    success: setCodepoints,
  },
  type: FETCH_CODEPOINTS,
})

export const fetchCodepointsByCategory = (
  category: string,
  key: string,
  page?: number,
): ApiSearchAction => {
  // convert plural to singular
  // eg: scripts => script
  // TODO: refactor
  category = (!page && category.substr(0, category.length - 1)) || category
  return {
    meta: {
      feature: CODEPOINTS,
      method: "GET",
      purge: !page,
      query: CODEPOINTS_BY_CATEGORY_KEY(category, key, page),
      queryResolver: "codepointsByCategoryKey",
      success: setCodepoints,
    },
    type: FETCH_CODEPOINTS,
  }
}

export const setCodepoints = (action: ApiSearchResponse) => ({
  meta: {feature: CODEPOINTS, purge: action.meta.purge},
  payload: <PaginatedCodepointResult>action.payload,
  type: SET_CODEPOINTS,
})
