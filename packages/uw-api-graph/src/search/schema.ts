import {gql} from "apollo-server"

export const typeDef = gql`
  extend type Query {
    suggest(prefix: String!): [String]!
  }
`
