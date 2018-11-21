import {WikiPage} from "@uw/domain"

export interface WikiPageState {
  readonly loading: boolean
  readonly result?: WikiPage
}

export const WIKI_PAGE = "@@Wiki/WikiPage"
export const FETCH_WIKI_PAGE = `${WIKI_PAGE}/FETCH`
export const SET_WIKI_PAGE = `${WIKI_PAGE}/SET`
