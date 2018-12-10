import {WikiSearch, ApiSearchResponse} from "@uw/domain"
import {isMobile} from "@uw/utils"
import {WIKI_SEARCH, FETCH_WIKI_SEARCH, SET_WIKI_SEARCH} from "./constants"

export const search = (q: string) => ({
  meta: {
    feature: WIKI_SEARCH,
    method: "GET",
    success: setWikiSearch,
    url: `/wiki?${isMobile() ? "isMobile&" : ""}q=${q}`,
  },
  type: FETCH_WIKI_SEARCH,
})

export const setWikiSearch = (action: ApiSearchResponse) => ({
  meta: {feature: WIKI_SEARCH},
  payload: <WikiSearch>action.payload,
  type: SET_WIKI_SEARCH,
})
