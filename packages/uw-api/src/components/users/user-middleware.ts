import {Request, Response, NextFunction} from "express"
import * as uuid from "uuid"

export const userMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const uwuid = req.cookies.uwuid
  if (!uwuid) {
    const id = uuid.v1()
    res.cookie("uwuid", id)
  }

  next()
}

export default {
  userMiddleware,
}
