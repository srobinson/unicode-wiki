import {WikiPage, ApiSearchResponse} from "@uw/domain"
import {isMobile} from "@uw/utils"
import {WIKI_PAGE, FETCH_WIKI_PAGE, SET_WIKI_PAGE} from "./constants"

export const loadWikiPage = (cp: string, page: string) => ({
  meta: {
    feature: WIKI_PAGE,
    method: "GET",
    success: setWikiPage,
    url: `/wiki/page?${isMobile() ? "isMobile&" : ""}&cp=${cp}&page=${encodeURIComponent(page)}`,
  },
  type: FETCH_WIKI_PAGE,
})

export const setWikiPage = (action: ApiSearchResponse) => ({
  meta: {feature: WIKI_PAGE},
  payload: <WikiPage>action.payload,
  type: SET_WIKI_PAGE,
})
