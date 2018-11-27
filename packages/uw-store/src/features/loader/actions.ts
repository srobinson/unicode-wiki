import {SET_LOADER} from "./constants"

export const setLoader = ({state, feature}: {state: boolean; feature: string}) => ({
  meta: {feature},
  payload: state,
  type: `${feature}/${SET_LOADER}`,
})
