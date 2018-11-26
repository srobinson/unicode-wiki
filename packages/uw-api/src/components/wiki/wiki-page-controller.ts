// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {fromCharCode} from "@uw/utils"
import {search} from "./wiki-search-controller"
import {WikiPage} from "@uw/domain"
import "express-async-errors"

const REDIRECT_TEST =
  '<div class=\\"redirectMsg\\"><p>Redirect to:</p><ul class=\\"redirectText\\"><li><a href=\\"/wiki/([0-9a-zA-Z_\\-()%/]*)'
const RELATIVE_URL_TEST = /(href|src)=(\\?)"(\/(w|wiki)\/)/gi
const RELATIVE_URL_REPLACE = 'target="_blank" $1="https://en.wikipedia.org$3'
const INLINE_STYLES_TEST = /(<style.+<\/style>)/gi

export const loadPage = async (req: Request, res: Response) => {
  const {page, redirect} = req.query
  const token = (redirect && redirect) || encodeURIComponent(fromCharCode(page))
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=parse&disabletoc=true&page=${token}`

  console.log("<URL::Page>", url, res.statusCode, page, token)

  const response = await axios.get(url)

  if (response.status >= 400) {
    res.status(404)
    throw new ResourceNotFoundException(url)
  }

  const data = response.data

  if (data.error) {
    onError(req, res, data)
  } else {
    onSuccess(req, res, data)
  }
}

const onError = async (req: Request, res: Response, data: any) => {
  const {category, key, page} = req.query
  const {error} = data
  const wiki: WikiPage = {
    category,
    cp: page,
    externalLinks: [],
    key,
    langlinks: [],
    text: error.info,
    title: "Error: " + error.code,
    type: "error",
  }

  if (error.code === "missingtitle") {
    // page not found -> get page from search results
    const wikiSearch = await doSearch(req, res)
    wiki.search = wikiSearch
  }

  res.status(res.statusCode).json(wiki)
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
    const wikiSearch = await doSearch(req, res)
    const wiki: WikiPage = {
      category,
      cp: page,
      externalLinks: parse.externallinks,
      key,
      langlinks: parse.langlinks,
      search: wikiSearch,
      text: text.replace(RELATIVE_URL_TEST, RELATIVE_URL_REPLACE).replace(INLINE_STYLES_TEST, ""),
      title: parse.displaytitle,
      type: "page",
    }
    res.status(res.statusCode).json(wiki)
  }
}

const doSearch = async (req: Request, res: Response) => {
  req.query.return = true
  await search(req, res)
  return res.locals.wikiSearch
}

export default {
  loadPage,
}
