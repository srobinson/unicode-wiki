import {ThemeColors, setTheme} from "@uw/store"

export interface PropsFromState {
  theme: ThemeColors
}

export interface PropsFromDispatch {
  setTheme: typeof setTheme
}

export interface OtherProps {
  children: (props: LayoutContainerProps) => React.ReactNode
}

export type LayoutContainerProps = PropsFromState & PropsFromDispatch
