import {Reducer} from "redux"
import {BlockState, ScriptState} from "@uw/domain"
import {BLOCKS, SET_BLOCKS, SET_SCRIPTS, SCRIPTS, SET_SYMBOLS, SYMBOLS} from "./constants"
import {SET_LOADER} from "../loader"

const blockState: BlockState = {
  docs: [],
  loading: false,
}

export const blocksReducer: Reducer<BlockState> = (state = blockState, action) => {
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

const scriptState: BlockState = {
  docs: [],
  loading: false,
}

export const scriptsReducer: Reducer<ScriptState> = (state = scriptState, action) => {
  switch (action.type) {
    case SET_SCRIPTS:
      const docs = action.payload
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

const symbolsState: BlockState = {
  docs: [],
  loading: false,
}

export const symbolsReducer: Reducer<BlockState> = (state = symbolsState, action) => {
  switch (action.type) {
    case SET_SYMBOLS:
      const docs = action.payload
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
