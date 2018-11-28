// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {ResourceNotFoundException, WikiPage} from "@uw/domain"
import {
  fromCharCode,
  isHex,
  REDIRECT_TEST,
  RELATIVE_URL_TEST,
  RELATIVE_URL_REPLACE,
  INLINE_STYLES_TEST,
} from "@uw/utils"
import {search} from "./wiki-search-controller"

export const loadPage = async (req: Request, res: Response) => {
  const {cp, redirect} = req.query
  const token = (redirect && redirect) || (isHex(cp) && encodeURIComponent(fromCharCode(cp))) || cp
  const url = `https://en.wikipedia.org/w/api.php?format=json&action=parse&disabletoc=true&page=${token}`

  req.logger.info({"WikiPage::URL": url})
  const response = await axios.get(url)

  if (response.status >= 400) {
    throw new ResourceNotFoundException(req, res)
  }

  const data = response.data

  if (data.error) {
    onError(req, res, data)
  } else {
    onSuccess(req, res, data)
  }
}

const onError = async (req: Request, res: Response, data: any) => {
  const {category, cp, key, page} = req.query
  const {error} = data

  // page not found -> try ONCE to load page with ${page} -> codepoint.name
  if (error.code === "missingtitle" && !req.query.redirect) {
    const redirect = key
      .split("-")
      .map((part: string) => part)
      .join(" ")

    req.logger.info({"WikiPage::redirect": redirect})
    req.query.redirect = redirect

    await loadPage(req, res)
  } else {
    const wikiSearch = await doSearch(req, res)
    const wiki: WikiPage = {
      category,
      cp,
      externalLinks: [],
      key,
      langlinks: [],
      page,
      search: wikiSearch,
      text: error.info,
      title: `${error.code}: ${page}`,
      type: "Error: " + error.code,
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
    req.logger.info({"WikiPage::redirect": redirect[1]})
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
      page,
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
