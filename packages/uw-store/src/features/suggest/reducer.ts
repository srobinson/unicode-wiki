import {Reducer} from "redux"
import {SuggestState} from "@uw/domain"
import {SUGGEST, SET_SUGGEST} from "./constants"
import {SET_LOADER} from "../loader"

const initialState: SuggestState = {
  loading: false,
  result: [],
}

export const suggestReducer: Reducer<SuggestState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SUGGEST:
      return {
        loading: false,
        result: action.payload,
      }

    case `${SUGGEST}/${SET_LOADER}`:
      return {
        loading: action.payload,
        result: state.result,
      }

    default:
      return state
  }
}
