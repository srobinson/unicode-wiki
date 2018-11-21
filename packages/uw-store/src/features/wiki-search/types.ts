import {WikiSearch} from "@uw/domain"

export interface WikiSearchState {
  readonly loading: boolean
  readonly result?: WikiSearch
}

export const WIKI_SEARCH = "@@Wiki/WikiSearch"
export const FETCH_WIKI_SEARCH = `${WIKI_SEARCH}/FETCH`
export const SET_WIKI_SEARCH = `${WIKI_SEARCH}/SET`
