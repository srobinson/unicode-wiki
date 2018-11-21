import {Category} from "@uw/domain"

export interface BlockState {
  readonly docs: Category[]
  readonly loading: boolean
}

export const BLOCKS = "@@Category/Blocks"
export const FETCH_BLOCKS = `${BLOCKS}/FETCH`
export const SET_BLOCKS = `${BLOCKS}/SET`
