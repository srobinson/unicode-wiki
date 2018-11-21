import {Reducer} from "redux"
import {SCRIPTS, ScriptState, SET_SCRIPTS} from "./types"
import {SET_LOADER} from "../../loader"
import {organizeCategories} from "../utils"

const initialState: ScriptState = {
  docs: [],
  loading: false,
}

const reducer: Reducer<ScriptState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_SCRIPTS:
      const docs = organizeCategories(action.payload)
      return {
        docs,
        loading: false,
      }

    case `${SCRIPTS}/${SET_LOADER}`:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

export {reducer as scriptsReducer}
