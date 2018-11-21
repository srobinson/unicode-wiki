import {Reducer} from "redux"
import {Loadingstate, SET_LOADER} from "./types"
import {ApiSearchRequest} from "@uw/domain"

const initialState = {
  loaders: [],
  loading: false,
}

const reducer: Reducer<Loadingstate> = (state = initialState, action) => {
  switch (true) {
    case action.type.includes(SET_LOADER):
      const meta: ApiSearchRequest = action.meta
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

export {reducer as loaderReducer}
