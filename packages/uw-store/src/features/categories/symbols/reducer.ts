import {Reducer} from "redux"
import {SET_SYMBOLS, SYMBOLS, SymbolState} from "./types"
import {SET_LOADER} from "../../loader"
import {organizeCategories} from "../utils"

const initialState: SymbolState = {
  docs: [],
  loading: false,
}

const reducer: Reducer<SymbolState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SYMBOLS:
      const docs = organizeCategories(action.payload)
      return {
        docs,
        loading: false,
      }

    case `${SYMBOLS}/${SET_LOADER}`:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

export {reducer as symbolsReducer}
