import {ApolloServer} from "apollo-server"
import * as fetch from "node-fetch"
import {schema} from "./schema"
import {dataSources} from "./datasources"
import "./config"

const server = new ApolloServer({
  dataSources,
  introspection: true,
  schema,
})

const PORT = process.env.GRAPHQL_PORT || 4000

server.listen({port: PORT}).then(({url}: {url: string}) => {
  console.log(`🚀 app running at ${url}`)
})
