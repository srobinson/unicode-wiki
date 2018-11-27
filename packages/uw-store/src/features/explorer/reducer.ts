import {Reducer} from "redux"
import {ExplorerState} from "@uw/domain"
import {SET_CATEGORY_TYPE, SET_CATEGORY_TITLE} from "./constants"

const initialState: ExplorerState = {
  categoryTitle: "",
  categoryType: "blocks",
}

export const explorerReducer: Reducer<ExplorerState> = (state = initialState, action) => {
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
