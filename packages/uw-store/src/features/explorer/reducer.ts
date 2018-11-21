import {Reducer} from "redux"
import {ExplorerState, SET_CATEGORY_TYPE, SET_CATEGORY_TITLE} from "./types"

const initialState: ExplorerState = {
  categoryTitle: "",
  categoryType: "blocks",
}

const reducer: Reducer<ExplorerState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CATEGORY_TYPE: {
      return {...state, categoryType: action.payload, categoryTitle: ""}
    }
    case SET_CATEGORY_TITLE: {
      return {...state, categoryTitle: action.payload}
    }
    default: {
      return state
    }
  }
}

export {reducer as explorerReducer}
