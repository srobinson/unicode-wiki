// tslint:disable:quotemark
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {fromCharCode} from "@uw/utils"
import {WikiPage} from "./wiki-model"

const REDIRECT_TEST =
  '<div class=\\"redirectMsg\\"><p>Redirect to:</p><ul class=\\"redirectText\\"><li><a href=\\"/wiki/([0-9a-zA-Z_\\-()%/]*)'
const RELATIVE_URL_TEST = /(href|src)=(\\?)"(\/(w|wiki)\/)/gi
const RELATIVE_URL_REPLACE = 'target="_blank" $1="https://en.wikipedia.org$3'

export const loadPage = async (req: Request, res: Response) => {
  try {
    const {category, key, page, redirect} = req.query
    const token = (redirect && redirect) || encodeURIComponent(fromCharCode(page))
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=parse&disabletoc=true&page=${token}`

    console.log("<URL>::", url, res.statusCode, page, token)

    const response = await axios.get(url)

    if (response.status >= 400) {
      res.status(404)
      throw new ResourceNotFoundException(url)
    }

    const data = await response.data

    if (data.error) {
      const {error} = data
      const wiki = new WikiPage({
        category,
        cp: page,
        externalLinks: [],
        key,
        langlinks: [],
        text: error.info,
        title: "Error: " + error.code,
        type: "error",
      })
      res.status(res.statusCode).json(wiki)
    } else {
      const {parse} = data
      let text = parse.text["*"]

      const redirect = text.match(REDIRECT_TEST)

      if (redirect) {
        // wiki api return a redirect document
        // -> follow the link
        req.query.redirect = redirect[1]
        await loadPage(req, res)
      } else {
        text = text.replace(RELATIVE_URL_TEST, RELATIVE_URL_REPLACE)

        const wiki = new WikiPage({
          category,
          cp: page,
          externalLinks: parse.externallinks,
          key,
          langlinks: parse.langlinks,
          text,
          title: parse.displaytitle,
          type: "page",
        })
        res.status(res.statusCode).json(wiki)
      }
    }
  } catch (e) {
    console.log(e)
  }
}

export default {
  loadPage,
}
