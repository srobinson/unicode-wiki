import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as compression from "compression"
import * as cors from "cors"
import {enhanceRequestMiddleware, errorHandlerMiddleware, logRequestMiddleware} from "@uw/logging"
import {userMiddleware} from "./endpoints"
import Routes from "./routes"
import "express-async-errors"
import "./config"

class Express {
  public static config(): express.Application {
    const app: express.Application = express()

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
      .use(errorHandlerMiddleware)

    return app
  }
}

export default Express.config()
