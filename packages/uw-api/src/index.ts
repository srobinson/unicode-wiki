import App from "./app"
import {jsonifyError} from "@uw/domain"
import {logger} from "@uw/logging"
import {MongoDb} from "./db"
import "./config"

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

const PORT = process.env.NODE_PORT

MongoDb.connect().then(() => {
  App.listen(PORT, (err: object) => {
    if (err) {
      return logger.error(jsonifyError(err))
    }
    return logger.info(`😊 Express server listening on port [${PORT}]`)
  })
})
