import ApolloClient from "apollo-boost"
import "./config"

const URL = process.env.REACT_APP_GRAPHQL_URL

export const apolloClient = new ApolloClient({
  uri: URL,
})

export * from "./category/queries"
export * from "./codepoint/queries"
export * from "./wiki/queries"
