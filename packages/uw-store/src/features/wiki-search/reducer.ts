import {Reducer} from "redux"
import {WIKI_SEARCH, WikiSearchState, SET_WIKI_SEARCH} from "./types"
import {SET_LOADER} from "../loader"

const initialState: WikiSearchState = {
  loading: false,
}

const reducer: Reducer<WikiSearchState> = (state = initialState, action) => {
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

export {reducer as wikiSearchReducer}
