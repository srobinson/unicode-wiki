import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@uw/domain"
import {categoryController as cc, codepointController as cpc} from "./endpoints"

export default class Routes {
  public static api() {
    const api: Router = Router()

    api
      .get("/", (_, res: Response) => {
        res.json({
          status: "OK",
        })
      })
      .get("/block/:id([0-9]+)", cc.getCategoryById.bind(undefined, "block"))
      .get("/block/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "block"))
      .get("/blocks/:id?", cc.getCategoriesByParent.bind(undefined, "block"))

      .get("/script/:id([0-9]+)", cc.getCategoryById.bind(undefined, "script"))
      .get("/script/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "script"))
      .get("/scripts/:id?", cc.getCategoriesByParent.bind(undefined, "script"))

      .get("/symbol/:id([0-9]+)", cc.getCategoryById.bind(undefined, "symbol"))
      .get("/symbol/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "symbol"))
      .get("/symbols/:id?", cc.getCategoriesByParent.bind(undefined, "symbol"))

      .get("/codepoint/:ucp", cpc.getCodepointByUCP)
      .get("/codepoints/:range(!suggest)?", cpc.getCodepointsByRange)

      .get("/search", cpc.search)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return api
  }
}
