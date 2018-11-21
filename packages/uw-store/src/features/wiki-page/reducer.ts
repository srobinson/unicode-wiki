import {Reducer} from "redux"
import {WIKI_PAGE, WikiPageState, SET_WIKI_PAGE} from "./types"
import {SET_LOADER} from "../loader"

const initialState: WikiPageState = {
  loading: false,
}

const reducer: Reducer<WikiPageState> = (state = initialState, action) => {
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

export {reducer as wikiPageReducer}
