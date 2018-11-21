import {Category} from "@uw/domain"
// export interface Script extends Category, ApiResponse {}

export interface ScriptState {
  readonly loading: boolean
  readonly docs: Category[]
}

export const SCRIPTS = "@@Category/Scripts"
export const FETCH_SCRIPTS = `${SCRIPTS}/FETCH`
export const SET_SCRIPTS = `${SCRIPTS}/SET`
