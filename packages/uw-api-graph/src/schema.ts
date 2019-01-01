import {gql, makeExecutableSchema} from "apollo-server"
import {typeDef as Category, resolvers as categoryResolvers} from "./category"
import {typeDef as Codepoint, resolvers as codepointResolvers} from "./codepoint"
import {typeDef as Search, resolvers as searchResolvers} from "./search"
import {typeDef as Wiki, resolvers as wikiResolvers} from "./wiki"

const resolvers = Object.assign({
  Query: {
    ...categoryResolvers.Query,
    ...codepointResolvers.Query,
    ...searchResolvers.Query,
    ...wikiResolvers.Query,
  },
})

const Query = gql`
  type Query {
    _empty: String
  }
`

export const schema = makeExecutableSchema({
  resolvers,
  typeDefs: [Query, Category, Codepoint, Search, Wiki],
})
