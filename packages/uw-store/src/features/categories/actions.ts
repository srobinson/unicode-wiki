import {ApiSearchResponse, Category, CATEGORY_TYPE} from "@uw/domain"
import * as constants from "./constants"

export const fetchCategories = () => {
  return Promise.all([
    fetchCategory(CATEGORY_TYPE.BLOCK),
    fetchCategory(CATEGORY_TYPE.SCRIPT),
    fetchCategory(CATEGORY_TYPE.SYMBOL),
  ])
}

export const fetchCategory = (category: CATEGORY_TYPE) => ({
  meta: {
    category,
    feature: constants[category],
    label: category,
    method: "GET",
    success: setCategory,
    url: `/${category.toLowerCase()}`,
  },
  type: constants[`FETCH_${category}`],
})

export const setCategory = (action: ApiSearchResponse) => ({
  meta: {feature: action.meta.feature},
  payload: <Category>action.payload,
  type: constants[`SET_${action.meta["label"]}`],
})
