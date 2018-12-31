import {gql} from "apollo-boost"

export const WIKI_PAGE_BY_UCP = (ucp: string, isMobile: boolean = false) => gql`
  query {
    wikiPage(ucp: "${ucp}", isMobile: ${isMobile ? true : false}) {
      cp
      page
      text
      title
      type
      search {
        text
        title
        hits {
          highlight
          redirect
          title
        }
      }
    }
  }
`
