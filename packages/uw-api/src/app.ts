import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as cors from "cors"
import {enhanceRequestMiddleware, errorHandlerMiddleware, logRequestMiddleware} from "@uw/logging"
import Routes from "./routes"
import {userMiddleware} from "./endpoints"
import "express-async-errors"
import "./config"

class Express {
  public static config(): express.Application {
    const app: express.Application = express()

    app
      .set("port", process.env.NODE_PORT)
      .use(cors())
      .use(bodyParser.json())
      .use(bodyParser.urlencoded({extended: true}))
      .use(cookieParser())
      .use(express.static("public"))
      .use(userMiddleware)
      .use(enhanceRequestMiddleware)
      .use(logRequestMiddleware)
      .use("/api", Routes.config())
      .use(errorHandlerMiddleware)

    return app
  }
}

export default Express.config()
