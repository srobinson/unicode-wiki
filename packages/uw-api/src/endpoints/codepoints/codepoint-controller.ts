import {Request, Response} from "express"
import {ResourceNotFoundException} from "@uw/domain"
import {codepointIndexRangeQuery, codepointIndexRangeOrQuery} from "@uw/utils"
import {generateLinks} from "../../utils/rest"
import * as CodepointDao from "./codepoint-dao"
import * as queries from "../../db/elastic/queries/codepoint"
import {PER_PAGE} from "./defaults"

export const getCodepointById = async (req: Request, res: Response) => {
  const index = req.params.id
  const cp = await CodepointDao.getById(index)
  if (!cp) {
    throw new ResourceNotFoundException(req, res)
  }
  res.status(200).json(cp)
}

export const getCodepointByUCP = async (req: Request, res: Response) => {
  const ucp = req.params.ucp
  const cp = await CodepointDao.getByUCP(ucp)
  if (!cp) {
    throw new ResourceNotFoundException(req, res)
  }
  res.status(200).json(cp)
}

export const getCodepointsByRange = async (req: Request, res: Response) => {
  // if no range passed in url, search from index: 1
  const range = req.params.range || "0000"
  const q = codepointIndexRangeQuery(range)
  await findCodepoints(req, res, q)
}

// db.codepoints.find({$or: [{index: {$gte: 1, $lte: 10}}, {index: {$gte: 110, $lte: 180}}]})
export const getCodepointsByRanges = async (req: Request, res: Response) => {
  const ranges = JSON.parse(req.params.ranges)
  const q = codepointIndexRangeOrQuery(ranges)
  await findCodepoints(req, res, q)
}

export const findCodepoints = async (req: Request, res: Response, q: Object) => {
  const {page = 1, perPage = PER_PAGE} = req.query
  const cps = await CodepointDao.find(q, parseInt(page, 10), parseInt(perPage, 10), {
    "block.value": 1,
    index: 1,
  })
  if (!(cps && cps.docs.length)) {
    throw new ResourceNotFoundException(req, res)
  }
  cps._links = generateLinks(req, cps)
  res.status(200).json(cps)
}

export const suggest = async (req: Request, res: Response) => {
  const term = req.params.term
  const results = await queries.suggest(term)
  res.status(200).json(results)
}

export const search = async (req: Request, res: Response) => {
  const q = req.query.q

  console.log("req.query", req.query)

  const results = await CodepointDao.find({
    suggest: q,
  })
  console.log("results", results)

  res.status(200).json(results)
}

export default {
  findCodepoints,
  getCodepointByUCP,
  getCodepointsByRange,
  getCodepointsByRanges,
  search,
  suggest,
}
