export const SET_CATEGORY_TYPE = "@@explorer/SET_CATEGORY_TYPE"
export type SET_CATEGORY_TYPE = typeof SET_CATEGORY_TYPE

export const SET_CATEGORY_TITLE = "@@explorer/SET_CATEGORY_TITLE"
export type SET_CATEGORY_TITLE = typeof SET_CATEGORY_TITLE

export type CategoryType = "blocks" | "scripts" | "symbols" | "search"

export interface ExplorerState {
  readonly categoryType: CategoryType
  readonly categoryTitle: string
}
