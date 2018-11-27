import {CategoryType} from "@uw/domain"
import {SET_CATEGORY_TYPE, SET_CATEGORY_TITLE} from "./constants"

export const setCategoryType = (categoryType: CategoryType) => ({
  payload: categoryType,
  type: SET_CATEGORY_TYPE,
})

export const setCategoryTitle = (categoryTitle: string) => ({
  payload: categoryTitle,
  type: SET_CATEGORY_TITLE,
})
