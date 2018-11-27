import {Request, Response, NextFunction} from "express"
import * as uuid from "uuid"
import {User} from "@uw/domain"
import {ApiLogger} from "./api-logger"

export const enhanceRequestMiddleware = (req: Request, res: Response, next: NextFunction) => {
  req.requestId = uuid.v1().substr(0, 8)

  const uwuid = req.cookies.uwuid
  if (uwuid) {
    req.user = new User(uuid.v1())
  }

  req.logger = new ApiLogger(req)

  next()
}
