import { NextFunction, Request, Response } from "express"
import { config } from "../config/environments"
import { HttpStatusCodes } from "../config/statusCodes"

export const ErrorHandler = (err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error(err)
  const message = config.env === 'local' ? err.message : 'InternalError'
  res.status(HttpStatusCodes.InternalError).send({ 
    code: HttpStatusCodes.InternalError,
    message: message,
    data: null
   })
}