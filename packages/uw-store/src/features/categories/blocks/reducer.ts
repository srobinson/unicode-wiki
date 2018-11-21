import {Reducer} from "redux"
import {BLOCKS, BlockState, SET_BLOCKS} from "./types"
import {SET_LOADER} from "../../loader"

const initialState: BlockState = {
  docs: [],
  loading: false,
}

const reducer: Reducer<BlockState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_BLOCKS:
      const docs = action.payload
      return {
        docs,
        loading: false,
      }

    case `${BLOCKS}/${SET_LOADER}`:
      return {
        ...state,
        loading: action.payload,
      }

    default:
      return state
  }
}

export {reducer as blocksReducer}
