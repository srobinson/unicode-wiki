import {PaginatedCodepointResult} from "@uw/domain"

export interface CodepointState {
  readonly loading: boolean
  readonly result?: PaginatedCodepointResult
}

export const CODEPOINTS = "@@Codepoints"
export const FETCH_CODEPOINTS = `${CODEPOINTS}/FETCH`
export const FETCH_CODEPOINTS_BY_CATEGORY = `${CODEPOINTS}/FETCH_BY_CATEGORY`
export const SET_CODEPOINTS = `${CODEPOINTS}/SET`

export const enum CodepointActionTypes {
  CODEPOINTS,
  FETCH_CODEPOINTS,
  FETCH_CODEPOINTS_BY_CATEGORY,
  SET_CODEPOINTS,
}
