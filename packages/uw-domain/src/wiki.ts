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
  hits: SearchHit[]
  query: string
}

/**
 * SearchHit entity definition
 */
export interface SearchHit {
  highlight: string
  redirect: string
  snippet: string
  title: string
}
