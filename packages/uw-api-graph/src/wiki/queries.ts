import {gql} from "apollo-boost"

export const WIKI_PAGE_BY_UCP = (ucp: string, page: string, isMobile: boolean = false) => gql`
  query {
    wikiPage(ucp: "${ucp}", page: "${page}", isMobile: ${isMobile ? true : false}) {
      cp
      page
      text
      title
      type
      search {
        hits {
          highlight
          redirect
          title
        }
        query
      }
    }
  }
`
