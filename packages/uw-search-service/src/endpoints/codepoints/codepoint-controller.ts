import {Request, Response} from "express"
import * as queries from "../../db/elastic/queries/codepoint"

export const suggest = async (req: Request, res: Response) => {
  const term = req.params.term
  const results = await queries.suggest(term)
  res.status(200).json(results)
}

export default {
  suggest,
}
