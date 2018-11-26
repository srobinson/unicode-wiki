// tslint:disable:no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException, SearchHit, WikiSearch} from "@uw/domain"
import "express-async-errors"
// import {logger} from "@uw/logging"
// import {jsonifyError} from "@uw/utils"

// export const search = (req: Request, res: Response) =>
//   searchAsync(req, res).catch(e => console.log(e))

export const search = async (req: Request, res: Response) => {
  const {category, key} = req.query
  const search = key
    .split("-")
    .map((token: string) => `%22${token}%22`)
    .join("%20AND%20")
  // const url = `https://en.wikipedia.org/w/api.php?format=json&action=opensearch&disabletoc=true&search=${key}`
  const url = `https://en.wikipedia.org/w/index.php?title=Special:Search&limit=10&cirrusDumpResult=&search=${search}`

  console.log("<URL::WikiSearch>", url)

  const response = await axios.get(url)

  if (response.status >= 400) {
    res.status(404)
    throw new ResourceNotFoundException(url)
  }
  const data = await response.data

  console.log("data", data[0])

  // tslint:disable-next-line:no-any
  const hits: SearchHit[] = data[0].result.hits.hits.map((hit: any) => ({
    highlight: hit.highlight.text,
    redirect: hit._source.title,
    title: hit._source.title,
  }))

  const wikiSearch: WikiSearch = {
    category,
    hits,
    key,
    title: key.replace(/\-/g, " "),
  }

  if (req.query.return) {
    res.locals.wikiSearch = wikiSearch
  } else {
    res.status(200).json(wikiSearch)
  }
}

export default {
  search,
}
