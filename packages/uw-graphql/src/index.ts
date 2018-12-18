import {ApolloServer} from "apollo-server"
import {schema} from "./schema"
import {dataSources} from "./datasources"

const server = new ApolloServer({
  dataSources,
  introspection: true,
  schema,
})

server.listen({port: 4000}).then(({url}: {url: string}) => {
  console.log(`🚀 app running at ${url}`)
})
