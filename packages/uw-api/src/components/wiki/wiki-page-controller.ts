// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException} from "@uw/domain"
import {
  REDIRECT_TEST,
  RELATIVE_URL_TEST,
  RELATIVE_URL_REPLACE,
  INLINE_STYLES_TEST,
  fromCharCode,
} from "@uw/utils"
import {search} from "./wiki-search-controller"
import {WikiPage} from "@uw/domain"
import {isHex} from "@uw/utils"

export const loadPage = async (req: Request, res: Response) => {
  const {page, redirect} = req.query
  const token =
    (redirect && redirect) || (isHex(page) && encodeURIComponent(fromCharCode(page))) || page
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

  // page not found -> try ONCE to load page with ${key}
  if (error.code === "missingtitle" && !req.query.redirect) {
    req.query.redirect = key
      .split("-")
      .map((part: string) => part)
      .join(" ")
    await loadPage(req, res)
  } else {
    const wikiSearch = await doSearch(req, res)
    const wiki: WikiPage = {
      category,
      cp: page,
      externalLinks: [],
      key,
      langlinks: [],
      search: wikiSearch,
      text: error.info,
      title: "Error: " + error.code,
      type: "error",
    }
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
