import {WIKI_PAGE, FETCH_WIKI_PAGE, SET_WIKI_PAGE} from "./types"
import {WikiPage} from "@uw/domain"

export const loadWikiPage = (category: string, key: string, cp: string, page: string) => {
  return {
    meta: {
      feature: WIKI_PAGE,
      method: "GET",
      url: `/wiki/page?category=${category}&key=${key}&cp=${cp}&page=${encodeURIComponent(page)}`,
    },
    type: FETCH_WIKI_PAGE,
  }
}

export const setWikiPage = ({data}: {data: WikiPage}) => ({
  meta: {feature: WIKI_PAGE},
  payload: data,
  type: SET_WIKI_PAGE,
})
