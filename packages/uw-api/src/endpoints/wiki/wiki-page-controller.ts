// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {WikiPage, ResourceNotFoundException} from "@uw/domain"
import {
  fromCharCode,
  generateClassName,
  isHex,
  ABSOLUTE_URL_TEST,
  ABSOLUTE_URL_REPLACE,
  BODY_TEST,
  HREF_TEST,
  HREF_REPLACE,
  RELATIVE_URL_TEST,
  RELATIVE_URL_REPLACE,
  TITLE_TEST,
  TITLE_REPLACE,
} from "@uw/utils"
import {search} from "./wiki-search-controller"

export const loadPage = async (req: Request, res: Response) => {
  const {cp, isMobile, redirect} = req.query
  const token = (redirect && redirect) || (isHex(cp) && encodeURIComponent(fromCharCode(cp))) || cp
  const mobile = isMobile !== undefined && isMobile ? "mobile-html" : "html"
  // const url = `https://en.wikipedia.org/w/api.php?format=json&mobileformat=true&action=parse&disabletoc=true&page=${token}`
  const url = `https://en.wikipedia.org/api/rest_v1/page/${mobile}/${token}`

  req.logger.info({"WikiPage::URL": url})

  if (!(cp && isHex(cp))) {
    throw new ResourceNotFoundException(req, res)
  }

  const response = await axios.get(url).catch((e: any) => {
    return {
      data: e.response.data,
      status: e.response.status,
    }
  })

  req.logger.info({"WikiPage::STATUS": response.status})

  const data = response.data

  if (data.type && data.type.match(/error/)) {
    onError(req, res, data)
  } else {
    onSuccess(req, res, data)
  }
}

const onError = async (req: Request, res: Response, data: any) => {
  const {cp, page} = req.query
  // search wiki using cp
  req.query.q = cp
  const wikiSearch = await doSearch(req, res)
  const wiki: WikiPage = {
    cp,
    externalLinks: [],
    langlinks: [],
    page,
    search: wikiSearch,
    text: data.detail,
    title: `${cp}: ${page || data.detail}`,
    type: `Error: ${data.type}: ${data.title}`,
  }
  res.status(res.statusCode).json(wiki)
}

const onSuccess = async (req: Request, res: Response, data: any) => {
  const {cp, page} = req.query
  const BODY_CP_CLASSNAME = `<div class="${generateClassName(cp)}">$1</div>`
  // search wiki using cp
  req.query.q = cp
  const wikiSearch = await doSearch(req, res)
  const titleMatch = data.match(TITLE_TEST)
  const title = (titleMatch && titleMatch[2]) || ""

  const text = data
    .replace(TITLE_TEST, TITLE_REPLACE)
    .replace(BODY_TEST, BODY_CP_CLASSNAME)
    .replace(ABSOLUTE_URL_TEST, ABSOLUTE_URL_REPLACE)
    .replace(RELATIVE_URL_TEST, RELATIVE_URL_REPLACE)
    .replace(HREF_TEST, HREF_REPLACE)

  const wiki: WikiPage = {
    cp,
    externalLinks: [],
    langlinks: [],
    page,
    search: wikiSearch,
    text,
    title: `${cp}: ${page || title}`,
    type: "page",
  }

  res.status(res.statusCode).json(wiki)
}

const doSearch = async (req: Request, res: Response) => {
  req.query.return = true
  await search(req, res)
  return res.locals.wikiSearch
}

export default {
  loadPage,
}
