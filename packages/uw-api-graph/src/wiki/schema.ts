import {gql} from "apollo-server"

export const typeDef = gql`
  extend type Query {
    wikiPage(ucp: String!, page: String, isMobile: Boolean): WikiPage
  }

  type WikiPage {
    cp: String!
    page: String
    search: WikiSearch
    text: String!
    title: String!
    type: String!
  }

  type WikiSearch {
    hits: [WikiSearchHit]!
    query: String!
  }

  type WikiSearchHit {
    highlight: String
    redirect: String
    title: String
  }
`
