import {logger} from "@uw/logging"
import {jsonifyError} from "@uw/domain"
import App from "./app"
import {MongoDb} from "./db"
import "./config"

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

process.on("SIGINT", function() {
  process.exit()
})

const PORT = process.env.NODE_PORT

MongoDb.connect().then(() => {
  if (!module.parent) {
    App.listen(PORT, (err: object) => {
      if (err) {
        return logger.error(jsonifyError(err))
      }
      return logger.info(`😊 Express server listening on port [${PORT}]`)
    })
  }
})

export default App
