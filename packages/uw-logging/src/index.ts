import {ExpressError, User} from "@uw/domain"

declare global {
  namespace Express {
    interface Request {
      error?: ExpressError | object
      requestId: string
      user: User
    }
  }
}

export * from "./enhanced-request"
export * from "./error-handler"
export * from "./log-request"
export * from "./logger"
export * from "./ora"
