import {Reducer} from "redux"
import {WikiPageState} from "@uw/domain"
import {WIKI_PAGE, SET_WIKI_PAGE} from "./constants"
import {SET_LOADER} from "../loader"

const initialState: WikiPageState = {
  loading: false,
}

export const wikiPageReducer: Reducer<WikiPageState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_WIKI_PAGE:
      const result = action.payload
      return {
        loading: false,
        result,
      }

    case `${WIKI_PAGE}/${SET_LOADER}`:
      return {
        loading: action.payload,
        result: state.result,
      }

    default:
      return state
  }
}
