import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@uw/domain"
import {codepointController as cpc} from "./endpoints"

export default class Routes {
  public static api() {
    const api: Router = Router()

    api
      .get("/", (_, res: Response) => {
        res.json({
          status: "OK",
        })
      })
      .get("/codepoints/suggest/:term?", cpc.suggest)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return api
  }
}
