// tslint:disable:no-any
import ApolloClient from "apollo-boost"
import * as fetch from "node-fetch"
import "./config"

const URL = process.env.REACT_APP_GRAPHQL_URL

export const apolloClient = new ApolloClient({
  fetch: fetch as any,
  fetchOptions: {
    fetch: fetch as any,
  },
  uri: URL,
})

export * from "./category/queries"
export * from "./codepoint/queries"
export * from "./wiki/queries"
