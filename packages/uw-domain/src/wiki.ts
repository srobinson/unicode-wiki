export interface WikiPageState {
  readonly loading: boolean
  readonly result?: WikiPage
}

export interface WikiSearchState {
  readonly loading: boolean
  readonly result?: WikiSearch
}

/**
 * WikiPage entity definition
 */
export interface WikiPage {
  cp: string // codepoint
  externalLinks: []
  langlinks: []
  page: string
  search?: WikiSearch
  text: string
  title: string
  type: string
}

/**
 * WikiSearch entity definition
 */
export interface WikiSearch {
  text: string
  title: string
  hits: SearchHit[]
}

/**
 * SearchHit entity definition
 */
export interface SearchHit {
  highlight: string
  redirect: string
  title: string
}
