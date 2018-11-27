import {ThemeColors} from "@uw/domain"
import {SET_THEME} from "./constants"

export const setTheme = (theme: ThemeColors) => ({
  payload: theme,
  type: SET_THEME,
})
