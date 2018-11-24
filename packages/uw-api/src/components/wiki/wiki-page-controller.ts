// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {fromCharCode} from "@uw/utils"
import {WikiPage} from "./wiki-model"
import {search} from "./wiki-search-controller"

const REDIRECT_TEST =
  '<div class=\\"redirectMsg\\"><p>Redirect to:</p><ul class=\\"redirectText\\"><li><a href=\\"/wiki/([0-9a-zA-Z_\\-()%/]*)'
const RELATIVE_URL_TEST = /(href|src)=(\\?)"(\/(w|wiki)\/)/gi
const RELATIVE_URL_REPLACE = 'target="_blank" $1="https://en.wikipedia.org$3'
const INLINE_STYLES_TEST = /(<style.+<\/style>)/gi

export const loadPage = async (req: Request, res: Response) => {
  try {
    const {page, redirect} = req.query
    const token = (redirect && redirect) || encodeURIComponent(fromCharCode(page))
    const url = `https://en.wikipedia.org/w/api.php?format=json&action=parse&disabletoc=true&page=${token}`

    console.log("<URL::Page>", url, res.statusCode, page, token)

    const response = await axios.get(url)

    if (response.status >= 400) {
      res.status(404)
      throw new ResourceNotFoundException(url)
    }

    const data = await response.data

    if (data.error) {
      onError(req, res, data)
    } else {
      onSuccess(req, res, data)
    }
  } catch (e) {
    console.log(e)
  }
}

const onError = async (req: Request, res: Response, data: any) => {
  const {category, key, page} = req.query
  const {error} = data
  if (error.code === "missingtitle") {
    // page not found -> get page from search results
    req.query.return = true
    await search(req, res)
    const urls = res.locals.wikiSearch.results[3]
    const uUrl = urls.filter((url: string) => url.match(/unicode/i))
    const url = (uUrl.length && uUrl[0]) || urls[0]
    const parts = url.split("/")
    const page = parts[parts.length - 1]
    req.query.redirect = page
    await loadPage(req, res)
  } else {
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
  }
}

const onSuccess = async (req: Request, res: Response, data: any) => {
  const {category, key, page} = req.query
  const {parse} = data
  let text = parse.text["*"]
  const redirect = text.match(REDIRECT_TEST)

  if (redirect) {
    // if wiki api returns a redirect document
    // -> follow the link
    req.query.redirect = redirect[1]
    await loadPage(req, res)
  } else {
    text = text.replace(RELATIVE_URL_TEST, RELATIVE_URL_REPLACE).replace(INLINE_STYLES_TEST, "")
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

export default {
  loadPage,
}
