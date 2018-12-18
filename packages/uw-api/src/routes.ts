import {Router, Request, Response} from "express"
import {ResourceNotFoundException} from "@uw/domain"
import {
  categoryController as cc,
  codepointController as cpc,
  wikiPageController as wpc,
  wikiSearchController as wsc,
} from "./endpoints"

// const DEBUG = process.env.NODE_ENV !== "production"

export default class Routes {
  public static api() {
    const api: Router = Router()

    api
      .get("/", (req: Request, res: Response) => {
        res.json({
          status: "OK",
        })
      })
      .get("/blocks/:id?", cc.getCategoriesByParent.bind(undefined, "block"))
      .get("/block/:id([0-9]+)", cc.getCategoryById.bind(undefined, "block"))
      .get("/block/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "block"))

      .get("/scripts/:id?", cc.getCategoriesByParent.bind(undefined, "script"))
      .get("/script/:id([0-9]+)", cc.getCategoryById.bind(undefined, "script"))
      .get("/script/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "script"))

      .get("/symbols/:id?", cc.getCategoriesByParent.bind(undefined, "symbol"))
      .get("/symbol/:id([0-9]+)", cc.getCategoryById.bind(undefined, "symbol"))
      .get("/symbol/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "symbol"))

      .get("/codepoint/:ucp", cpc.getCodepointByUCP)
      .get("/codepoints/suggest/:term?", cpc.suggest)
      .get("/codepoints/:range(!suggest)?", cpc.getCodepointsByRange)
      .get("/codepoint-ranges/:ranges", cpc.getCodepointsByRanges)
      .get("/search", cpc.search)

      .get("/wiki", wsc.search)
      .get("/wiki/page", wpc.loadPage)

      .get("*", (req: Request, res: Response) => {
        throw new ResourceNotFoundException(req, res)
      })

    return api
  }
}
