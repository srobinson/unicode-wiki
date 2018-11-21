import {Category} from "@uw/domain"
import {SYMBOLS, FETCH_SYMBOLS, SET_SYMBOLS} from "./types"

export const fetchSymbols = () => ({
  meta: {
    feature: SYMBOLS,
    method: "GET",
    url: "/symbols",
  },
  type: FETCH_SYMBOLS,
})

export const setSymbols = ({data}: {data: Category[]}) => ({
  meta: {feature: SYMBOLS},
  payload: data,
  type: SET_SYMBOLS,
})
