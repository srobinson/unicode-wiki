import {Reducer} from "redux"
import {LayoutState} from "@uw/domain"
import {SET_THEME} from "./constants"

const initialState: LayoutState = {
  theme: "light",
}

export const layoutReducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      return {...state, theme: action.payload}
    }
    default: {
      return state
    }
  }
}
