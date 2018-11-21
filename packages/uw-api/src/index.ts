import App from "./app"
import {logger} from "@uw/logging"
import "./config"

const PORT = process.env.NODE_PORT

App.listen(PORT, (err: object) => {
  if (err) {
    return logger.error(err)
  }
  return logger.info(`😊 Express server listening on port [${PORT}]`)
})
