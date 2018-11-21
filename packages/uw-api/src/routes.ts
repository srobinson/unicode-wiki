import {Router, Request, Response} from "express"
import {
  categoryController as cc,
  codepointController as cpc,
  wikiPageController as wpc,
  wikiSearchController as wsc,
} from "./components"

const router: Router = Router()
export default class Routes {
  public static config() {
    router.get("/blocks/:id?", cc.getCategoriesByParent.bind(undefined, "block"))
    router.get("/block/:id", cc.getCategoryById.bind(undefined, "block"))
    router.get("/block/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "block"))

    router.get("/symbols/:id?", cc.getCategoriesByParent.bind(undefined, "symbol"))
    router.get("/symbol/:id", cc.getCategoryById.bind(undefined, "symbol"))
    router.get("/symbol/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "symbol"))

    router.get("/scripts/:id?", cc.getCategoriesByParent.bind(undefined, "script"))
    router.get("/script/:id", cc.getCategoryById.bind(undefined, "script"))
    router.get("/script/:id/codepoints", cc.getCodepointsByCategoryById.bind(undefined, "script"))

    router.get("/codepoint/:ucp", cpc.getCodepointByUCP)
    router.get("/codepoints/:range?", cpc.getCodepointsByRange)
    router.get("/codepoint-ranges/:ranges", cpc.getCodepointsByRanges)

    router.get("/wiki", wsc.search)
    router.get("/wiki/page", wpc.loadPage)

    router.get("*", (req: Request, res: Response) =>
      res.status(404).json({
        message: `ResourceNotFoundException: ${req.url}`,
        status: 404,
      }),
    )

    return router
  }
}
