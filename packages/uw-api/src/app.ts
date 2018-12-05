import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as compression from "compression"

import * as cors from "cors"
import {enhanceRequestMiddleware, errorHandlerMiddleware, logRequestMiddleware} from "@uw/logging"
import Routes from "./routes"
import {userMiddleware} from "./endpoints"
import "express-async-errors"
import "./config"

import {ApolloServer} from "apollo-server-express"

import resolvers from "./graphql/resolvers"
import schema from "./graphql/schema"

class Express {
  public static config(): express.Application {
    const app: express.Application = express()
    const graphServer = new ApolloServer({typeDefs: schema, resolvers})
    graphServer.applyMiddleware({app})

    app
      .set("port", process.env.NODE_PORT)
      .use(cors())
      .use(bodyParser.urlencoded({extended: false}))
      .use(bodyParser.json())
      .use(cookieParser())
      .use(compression())
      .use(express.static("public"))
      .use(userMiddleware)
      .use(enhanceRequestMiddleware)
      .use(logRequestMiddleware)
      .use("/api", Routes.api())

      // .use("/graphql", Routes.graphql())

      .use(errorHandlerMiddleware)

    return app
  }
}

export default Express.config()
