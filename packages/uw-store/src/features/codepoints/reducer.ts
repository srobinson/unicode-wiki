import {Reducer} from "redux"
import {CodepointState} from "@uw/domain"
import {CODEPOINTS, SET_CODEPOINTS} from "./constants"
import {SET_LOADER} from "../loader"

const initialState: CodepointState = {
  loading: false,
}

export const codepointReducer: Reducer<CodepointState> = (state = initialState, action) => {
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
