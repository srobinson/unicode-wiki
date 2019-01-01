import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@uw/domain"
import {wikiPageController as wpc, wikiSearchController as wsc} from "./endpoints"

export default class Routes {
  public static api() {
    const api: Router = Router()

    api
      .get("/", (_, res: Response) => {
        res.json({
          status: "OK",
        })
      })

      .get("/wiki", wsc.search)
      .get("/wiki/page", wpc.loadPage)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return api
  }
}
