export const SET_THEME = "@@layout/SET_THEME"
export type SET_THEME = typeof SET_THEME

export type ThemeColors = "light" | "dark"

export interface LayoutState {
  readonly theme: ThemeColors
}
