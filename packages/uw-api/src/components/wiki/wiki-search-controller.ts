// tslint:disable:no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException, SearchHit, WikiSearch} from "@uw/domain"
import {isHex, fromCharCode} from "@uw/utils"

export const search = async (req: Request, res: Response) => {
  const {category, cp, key, page, redirect} = req.query
  const search = (redirect && redirect) || (isHex(cp) && encodeURIComponent(fromCharCode(cp))) || cp
  // const url = `https://en.wikipedia.org/w/index.php?title=Special:Search&limit=10&cirrusDumpResult=&search=${search}`
  const url = `https://en.wikipedia.org/w/api.php?action=query&limit=20&origin=*&format=json&formatversion=2&utf8&list=search&srsearch=${search}`

  console.log("<URL::WikiSearch>", url)

  const response = await axios.get(url)
  if (response.status >= 400) {
    res.status(404)
    throw new ResourceNotFoundException(url)
  }
  const data = await response.data
  const results = data.query.search
  if (results.length === 0 && !req.query.redirect) {
    const redirect = page
      .split(" ")
      .map((token: string) => `%22${token}%22`)
      .join("%20AND%20")

    console.log("redirect", redirect)

    req.query.redirect = redirect
    await search(req, res)
  } else {
    const hits: SearchHit[] =
      results.map((hit: any) => ({
        highlight: hit.snippet,
        redirect: hit.title,
        title: hit.title,
      })) || []

    const wikiSearch: WikiSearch = {
      category,
      hits,
      key,
      text: ",",
      title: key.replace(/\-/g, " "),
    }

    if (req.query.return) {
      res.locals.wikiSearch = wikiSearch
    } else {
      res.status(200).json(wikiSearch)
    }
  }
}

export default {
  search,
}
