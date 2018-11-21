import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {logger} from "@uw/logging"

import {WikiSearch} from "./wiki-model"

export const search = async (req: Request, res: Response) => {
  const {category, key} = req.query
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=opensearch&disabletoc=true&search=${key}`

  try {
    const response = await axios.get(url)
    if (response.status < 400) {
      const data = response.data
      const wikiSearch = new WikiSearch({
        category,
        key,
        results: data,
      })
      res.json(wikiSearch)
    } else {
      res.status(404)
      throw new ResourceNotFoundException(url)
    }
  } catch (e) {
    logger.error(e)
  }
}

export default {
  search,
}
