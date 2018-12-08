import {Category, CategoryType} from "@uw/domain"

export const categoryTypes: CategoryType[] = ["blocks", "scripts", "symbols"]

// tslint:disable:no-any
export interface NavigationComponentProps {
  currentCategory: Category | undefined
  categoryList: Category[]
  categoryType: string
  next: any
  prev: any
  setCategory: (key: string) => void
  setCategoryType: (type: CategoryType) => void
}

export interface InternalState {
  isNavigationTitleMenuOpen: boolean
  isNavigationTypeMenuOpen: boolean
  searchCategories: Category[] | undefined
}
