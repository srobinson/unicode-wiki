export const SET_LOADER = "SET_LOADER"

export interface Loadingstate {
  readonly loaders: string[]
  readonly loading: boolean
}
