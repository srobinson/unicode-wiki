// tslint:disable:no-any
import {Request, Response, NextFunction} from "express"

export const errorHandlerMiddleware = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const statusCode = res.statusCode && res.statusCode >= 400 ? res.statusCode : 500

  req.error = Object.assign({}, {statusCode}, err)
  res.status(statusCode)
  res.json(req.error)
}
