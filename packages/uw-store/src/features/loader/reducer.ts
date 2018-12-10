import {Reducer} from "redux"
import {SET_LOADER} from "./constants"
import {ApiSearchMetadata, LoadingState} from "@uw/domain"

const initialState: LoadingState = {
  loaders: [],
  loading: false,
}

export const loaderReducer: Reducer<LoadingState> = (state = initialState, action) => {
  switch (true) {
    case action.type.includes(SET_LOADER):
      const meta: ApiSearchMetadata = action.meta
      const feature = meta.feature
      const loading = action.payload
      if (loading) {
        return {
          loaders: [...state.loaders, feature],
          loading: true,
        }
      }
      const loaders = state.loaders.filter(loader => loader !== feature)
      return {
        loaders,
        loading: loaders.length > 0,
      }

    default:
      return state
  }
}
