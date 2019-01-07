import {ApolloServer} from "apollo-server"
import {schema} from "./schema"
import {dataSources} from "./datasources"
import "./config"

// NEW FEAT TEST!! 0.3.3
const server = new ApolloServer({
  dataSources,
  introspection: true,
  schema,
})

const PORT = process.env.GRAPHQL_PORT || 4000

server.listen({port: PORT}).then(({url}: {url: string}) => {
  console.log(`🚀 app running at ${url}`)
})
