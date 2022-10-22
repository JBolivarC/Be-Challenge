import { Request, Response } from "express";
import { HttpStatusCodes } from "./../config/statusCodes";

export class BaseController {
  Ok(res: Response, data: any, message?: string) {
    res.status(HttpStatusCodes.Ok).send({
      code: HttpStatusCodes.Ok,
      message: message || 'Ok',
      data
    })
  }

  Created(res: Response, data: any) {
    res.status(HttpStatusCodes.Created).send({
      code: HttpStatusCodes.Created,
      message: 'Created',
      data
    })
  }

  NotFound(res: Response, message?: string) {
    res.status(HttpStatusCodes.NotFound).send({
      code: HttpStatusCodes.NotFound,
      message: message || 'NotFound',
      data: null
    })
  }

  NoContent(res: Response) {
    res.status(HttpStatusCodes.NoContent).send()
  }

  BadRequest(res: Response, message?: string) {
    res.status(HttpStatusCodes.BadRequest).send({
      code: HttpStatusCodes.BadRequest,
      message: message || 'BadRequest',
      data: null
    })
  }
}