import {gql} from "apollo-server"

export const typeDef = gql`
  extend type Query {
    wikiPage(ucp: String!, isMobile: Boolean): WikiPage
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
    text: String!
    title: String!
    hits: [WikiSearchHit]!
  }

  type WikiSearchHit {
    highlight: String
    redirect: String
    title: String
  }
`
