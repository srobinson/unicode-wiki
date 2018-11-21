import {Category} from "@uw/domain"

// export interface Symboll extends Category, ApiResponse {}

export interface SymbolState {
  readonly loading: boolean
  readonly docs: Category[]
}

export const SYMBOLS = "@@Category/Symbols"
export const FETCH_SYMBOLS = `${SYMBOLS}/FETCH`
export const SET_SYMBOLS = `${SYMBOLS}/SET`
