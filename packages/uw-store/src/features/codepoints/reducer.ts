import {Reducer} from "redux"
import {CODEPOINTS, CodepointState, SET_CODEPOINTS} from "./types"
import {SET_LOADER} from "../loader"

const initialState: CodepointState = {
  loading: false,
}

const reducer: Reducer<CodepointState> = (state = initialState, action) => {
  switch (action.type) {
    case SET_CODEPOINTS:
      const currentDocs = (state.result && state.result.docs) || []
      const payloadDocs = action.payload.docs
      const docs = action.meta.purge ? payloadDocs : currentDocs.concat(payloadDocs)
      const result = Object.assign({}, action.payload, {docs})
      return {
        loading: false,
        result,
      }

    case `${CODEPOINTS}/${SET_LOADER}`:
      return {
        loading: action.payload,
        result: state.result,
      }

    default:
      return state
  }
}

export {reducer as codepointReducer}
