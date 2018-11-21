import {SET_LOADER} from "./types"

export const setLoader = ({state, feature}: {state: boolean; feature: string}) => ({
  meta: {feature},
  payload: state,
  type: `${feature}/${SET_LOADER}`,
})
