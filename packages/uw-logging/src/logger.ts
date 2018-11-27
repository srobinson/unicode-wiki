// tslint:disable:object-literal-sort-keys no-any
import {createLogger, format, transports} from "winston"

const MESSAGE = Symbol.for("message")

// tslint:disable:object-literal-sort-keys no-any

const jsonFormatter = (logEntry: any) => {
  const base = {timestamp: new Date(), ...logEntry}
  logEntry[MESSAGE] = JSON.stringify(base, undefined, 2)
  return logEntry
}

// const logFormat = json((info: any) => {
//   console.log("XXX", info)

//   return {
//     level: info.level,
//     date: info.timestamp,
//     message: info.message,
//   }
// })

const logger = createLogger({
  exceptionHandlers: [
    new transports.Console({
      level: "error",
    }),
  ],
  exitOnError: false,
  // format: combine(timestamp(), logFormat),
  format: format(jsonFormatter)(),
  transports: [
    new transports.Console({
      level: "info",
      stderrLevels: [],
    }),
  ],
})

// export const requestInfoMessage = (req: Request) => ({
//   request: {
//     method: req.method,
//     requestId: req.requestId,
//     url: req.originalUrl,
//     user: req.user || "guest",
//     userAgent: req.headers["user-agent"],
//   },
// })

logger.on("error", err => {
  console.log("OOOPS! Something bad happened with winston", err)
})

export {logger}
