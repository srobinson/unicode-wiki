import {Reducer} from "redux"
import {LayoutState, SET_THEME} from "./types"

const initialState: LayoutState = {
  theme: "light",
}

const reducer: Reducer<LayoutState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_THEME: {
      return {...state, theme: action.payload}
    }
    default: {
      return state
    }
  }
}

export {reducer as layoutReducer}
