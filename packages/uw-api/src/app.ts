import * as express from "express"
import * as bodyParser from "body-parser"
import * as cookieParser from "cookie-parser"
import * as cors from "cors"
import {enhanceRequestMiddleware, errorHandlerMiddleware, logRequestMiddleware} from "@uw/logging"
import Routes from "./routes"
import {MongoDb} from "./db"
import {userMiddleware} from "./endpoints"
import "express-async-errors"
import "./config"

class App {
  public app: express.Application

  constructor() {
    this.app = express()
    this.config()
    MongoDb.connect()
  }

  private config(): void {
    const app = this.app
    app.set("port", process.env.NODE_PORT)
    app.use(cors())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(cookieParser())
    app.use(express.static("public"))
    app.use(userMiddleware)
    app.use(enhanceRequestMiddleware)
    app.use(logRequestMiddleware)
    app.use("/api", Routes.config())
    app.use(errorHandlerMiddleware)
  }
}

export default new App().app
