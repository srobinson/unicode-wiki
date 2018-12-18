// tslint:disable:no-any
import {gql} from "apollo-server"

export const typeDef = gql`
  extend type Query {
    categories: Categories!
    categoryByType(type: String!): [Category!]!
  }

  type Categories {
    type: String!
    values: [Category]
  }

  type Category {
    childRanges: [CodepointHexRange]!
    hasChildren: Boolean
    index: Int!
    key: String!
    level: Int
    parent: Int!
    range: [CodepointHexRange]!
    title: String!
  }

  type CodepointHexRange {
    from: String!
    to: String
  }
`
