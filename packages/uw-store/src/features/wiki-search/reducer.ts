import {Reducer} from "redux"
import {WikiSearchState} from "@uw/domain"
import {WIKI_SEARCH, SET_WIKI_SEARCH} from "./constants"
import {SET_LOADER} from "../loader"

const initialState: WikiSearchState = {
  loading: false,
}

export const wikiSearchReducer: Reducer<WikiSearchState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_WIKI_SEARCH:
      const result = action.payload
      return {
        loading: false,
        result,
      }

    case `${WIKI_SEARCH}/${SET_LOADER}`:
      return {
        loading: action.payload,
        result: state.result,
      }

    default:
      return state
  }
}
