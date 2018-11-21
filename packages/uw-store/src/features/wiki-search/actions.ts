import {WIKI_SEARCH, FETCH_WIKI_SEARCH, SET_WIKI_SEARCH} from "./types"
import {WikiSearch} from "@uw/domain"

export const search = (category: string, key: string) => {
  return {
    meta: {
      feature: WIKI_SEARCH,
      method: "GET",
      url: `/wiki?category=${category}&key=${key}`,
    },
    type: FETCH_WIKI_SEARCH,
  }
}

export const setWikiSearch = ({data}: {data: WikiSearch}) => ({
  meta: {feature: WIKI_SEARCH},
  payload: data,
  type: SET_WIKI_SEARCH,
})
