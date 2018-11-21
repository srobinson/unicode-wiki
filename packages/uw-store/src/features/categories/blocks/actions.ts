import {Category} from "@uw/domain"
import {BLOCKS, FETCH_BLOCKS, SET_BLOCKS} from "./types"

export const fetchBlocks = () => ({
  meta: {
    feature: BLOCKS,
    method: "GET",
    url: "/blocks",
  },
  type: FETCH_BLOCKS,
})

export const setBlocks = ({data}: {data: Category[]}) => ({
  meta: {feature: BLOCKS},
  payload: data,
  type: SET_BLOCKS,
})
