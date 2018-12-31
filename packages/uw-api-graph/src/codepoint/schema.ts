import {gql} from "apollo-server"

export const typeDef = gql`
  extend type Query {
    codepoints: PaginatedCodepointResult!
    codepointByUCP(ucp: String!): Codepoint
    codepointsByCategoryKey(category: String!, key: String!, page: Int): PaginatedCodepointResult!
    suggest(prefix: String!): [String]!
    search(q: String!): PaginatedCodepointResult!
  }

  type ExtendedProperty {
    key: String!
    name: String!
    value: String
  }

  type Codepoint {
    block: ExtendedProperty
    block_header: String
    block_subheader: String
    cp: String
    font: String
    index: Int
    general_category: ExtendedProperty
    name: String
    name_v1: String
    script: ExtendedProperty
    title: String
  }

  type PaginatedCodepointResult {
    _links: [Link]
    docs: [Codepoint]!
    hasNextPage: Boolean!
    hasPrevPage: Boolean!
    limit: Int!
    nextPage: Int
    page: Int!
    prevPage: Int
    totalDocs: Int!
    totalPages: Int!
  }

  type Link {
    href: String!
    rel: String!
    type: String
  }
`
