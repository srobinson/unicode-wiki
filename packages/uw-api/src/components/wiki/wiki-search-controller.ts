import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {logger} from "@uw/logging"

import {WikiSearch} from "./wiki-model"

export const search = async (req: Request, res: Response) => {
  const {category, key} = req.query
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=opensearch&disabletoc=true&search=${key}`

  console.log("<URL::WikiSearch>", url)

  try {
    const response = await axios.get(url)

    if (response.status >= 400) {
      res.status(404)
      throw new ResourceNotFoundException(url)
    }

    const data = response.data

    const wikiSearch = new WikiSearch({
      category,
      key,
      results: data,
      title: key.replace(/\-/g, " "),
    })

    if (req.query.return) {
      res.locals.wikiSearch = wikiSearch
    } else {
      res.status(200).json(wikiSearch)
    }
  } catch (e) {
    logger.error(e)
  }
}

export default {
  search,
}
