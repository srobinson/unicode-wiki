import {WikiPage, ApiSearchResponse} from "@uw/domain"
import {isMobile} from "@uw/utils"
import {WIKI_PAGE_BY_UCP} from "@uw/api-graph"
import {WIKI_PAGE, FETCH_WIKI_PAGE, SET_WIKI_PAGE} from "./constants"

export const loadWikiPage = (ucp: string, page: string) => ({
  meta: {
    feature: WIKI_PAGE,
    method: "GET",
    query: WIKI_PAGE_BY_UCP(ucp, page, isMobile()),
    queryResolver: "wikiPage",
    success: setWikiPage,
  },
  type: FETCH_WIKI_PAGE,
})

export const setWikiPage = (action: ApiSearchResponse) => ({
  meta: {feature: WIKI_PAGE},
  payload: <WikiPage>action.payload,
  type: SET_WIKI_PAGE,
})
