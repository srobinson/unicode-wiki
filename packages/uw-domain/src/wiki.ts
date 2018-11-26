/**
 * WikiPage entity definition
 */
export interface WikiPage {
  category: string
  cp: string // codepoint
  externalLinks: []
  key: string
  langlinks: []
  search?: WikiSearch
  text: string
  title: string
  type: string
}

/**
 * WikiSearch entity definition
 */
export interface WikiSearch {
  category: string
  key: string
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
