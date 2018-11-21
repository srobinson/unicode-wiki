import {createLogger, format, transports} from "winston"

const {combine, timestamp, json} = format

// tslint:disable:object-literal-sort-keys no-any
const logFormat = json((info: any) => {
  return {
    level: info.level,
    date: info.timestamp,
    message: info.message,
  }
})

const logger = createLogger({
  exceptionHandlers: [
    new transports.File({
      filename: "/var/uw/logs/exceptions.log",
    }),
  ],
  exitOnError: false,
  format: combine(timestamp(), logFormat),
  transports: [
    new transports.Console({
      level: "info",
      stderrLevels: [],
    }),
  ],
})

logger.on("error", err => {
  console.log("OOOPS! Something bad happened with winston", err)
})

export {logger}
