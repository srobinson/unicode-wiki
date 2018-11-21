import {Category} from "@uw/domain"
import {SCRIPTS, FETCH_SCRIPTS, SET_SCRIPTS} from "./types"

export const fetchScripts = () => ({
  meta: {
    feature: SCRIPTS,
    method: "GET",
    url: "/scripts",
  },
  type: FETCH_SCRIPTS,
})

export const setScripts = ({data}: {data: Category[]}) => ({
  meta: {feature: SCRIPTS},
  payload: data,
  type: SET_SCRIPTS,
})
