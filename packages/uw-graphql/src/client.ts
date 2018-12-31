// tslint:disable:no-any
import ApolloClient from "apollo-boost"
import fetch from "node-fetch"

const URL = process.env.GRAPHQL_URL || "http://localhost:4000"

export const apolloClient = new ApolloClient({
  fetch: fetch as any,
  fetchOptions: {
    fetch: fetch as any,
  },
  uri: URL,
})

export * from "./category/queries"
export * from "./codepoint/queries"
