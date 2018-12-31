import {createLogger, format, transports} from "winston"

const MESSAGE = Symbol.for("message")

// tslint:disable-next-line:no-any
const jsonFormatter = (logEntry: any) => {
  const base = {timestamp: new Date(), ...logEntry}
  logEntry[MESSAGE] = JSON.stringify(base, undefined, 2)
  return logEntry
}

const logger = createLogger({
  exceptionHandlers: [
    new transports.Console({
      level: "error",
    }),
  ],
  exitOnError: false,
  format: format(jsonFormatter)(),
  transports: [
    new transports.Console({
      level: process.env.NODE_ENV === "test" ? "error" : "info",
      stderrLevels: [],
    }),
  ],
})

logger.on("error", err => {
  console.log("OOOPS! Something bad happened with winston", err)
})

export {logger}
