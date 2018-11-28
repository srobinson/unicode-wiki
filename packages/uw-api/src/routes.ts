import {Router, Request, Response} from "express"
import {
  categoryController as cc,
  codepointController as cpc,
  wikiPageController as wpc,
  wikiSearchController as wsc,
} from "./endpoints"
import {ResourceNotFoundException} from "@uw/domain"

export default class Routes {
  public static config() {
    const router: Router = Router()

    router
      .get("/blocks/:id?", cc.getCategoriesByParent.bind(undefined, "block"))
      .get("/block/:id", cc.getCategoryById.bind(undefined, "block"))
      .get("/block/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "block"))

      .get("/symbols/:id?", cc.getCategoriesByParent.bind(undefined, "symbol"))
      .get("/symbol/:id", cc.getCategoryById.bind(undefined, "symbol"))
      .get("/symbol/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "symbol"))

      .get("/scripts/:id?", cc.getCategoriesByParent.bind(undefined, "script"))
      .get("/script/:id", cc.getCategoryById.bind(undefined, "script"))
      .get("/script/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "script"))

      .get("/codepoint/:ucp", cpc.getCodepointByUCP)
      .get("/codepoints/:range?", cpc.getCodepointsByRange)
      .get("/codepoint-ranges/:ranges", cpc.getCodepointsByRanges)

      .get("/wiki", wsc.search)
      .get("/wiki/page", wpc.loadPage)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return router
  }
}
