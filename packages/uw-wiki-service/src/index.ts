import {logger} from "@uw/logging"
import {jsonifyError} from "@uw/domain"
import App from "./app"
import "./config"

process.on("unhandledRejection", error => {
  logger.error({unhandledRejection: jsonifyError(error)})
})

process.on("SIGINT", function() {
  process.exit()
})

const PORT = process.env.WIKI_SERVICE_PORT

if (!module.parent) {
  App.listen(PORT, (err: object) => {
    if (err) {
      return logger.error(jsonifyError(err))
    }
    return logger.info(`😊 wiki-service listening on port [${PORT}]`)
  })
}

export default App
