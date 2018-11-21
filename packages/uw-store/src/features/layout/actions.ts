import {SET_THEME, ThemeColors} from "./types"

export const setTheme = (theme: ThemeColors) => ({
  payload: theme,
  type: SET_THEME,
})
