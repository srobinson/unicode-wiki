import {Request} from "express"
import {logger} from "./logger"
import {generateInfoMessage} from "./log-request"

export class ApiLogger {
  // tslint:disable-next-line:no-any
  private message: any

  constructor(req?: Request) {
    if (req) {
      this.message = generateInfoMessage(req)
    }
  }

  info(args: {}) {
    return this._log("info", args)
  }

  log(args: {}) {
    return this._log("log", args)
  }

  warn(args: {}) {
    return this._log("warn", args)
  }

  error(args: string[]) {
    return this._log("error", args)
  }

  private _log(level: string, args: {} = {}) {
    return logger[level](this.message, {...args})
  }
}
