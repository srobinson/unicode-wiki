import {ApiSearchResponse, Category, CATEGORY_TYPE} from "@uw/domain"
import {CATEGORY_BY_TYPE} from "@uw/api-graph"
import * as constants from "./constants"

export const fetchCategories = () => {
  fetchCategory(CATEGORY_TYPE.BLOCK)
  fetchCategory(CATEGORY_TYPE.SCRIPT)
  fetchCategory(CATEGORY_TYPE.SYMBOL)
}

export const fetchCategory = (category: CATEGORY_TYPE) => ({
  meta: {
    category,
    feature: constants[category],
    label: category,
    method: "GET",
    query: CATEGORY_BY_TYPE(category),
    queryResolver: "categoryByType",
    success: setCategory,
  },
  type: constants[`FETCH_${category}`],
})

export const setCategory = (action: ApiSearchResponse) => ({
  meta: {feature: action.meta.feature},
  payload: <Category>action.payload,
  type: constants[`SET_${action.meta["label"]}`],
})
