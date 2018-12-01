// tslint:disable:quotemark no-any
import {Request, Response} from "express"
import axios from "axios"
import {WikiPage} from "@uw/domain"
import {fromCharCode, isHex} from "@uw/utils"
import {search} from "./wiki-search-controller"

export const loadPage = async (req: Request, res: Response) => {
  const {cp, isMobile, redirect} = req.query
  const token = (redirect && redirect) || (isHex(cp) && encodeURIComponent(fromCharCode(cp))) || cp
  const type = isMobile !== undefined ? "mobile-html" : "html"
  // const url = `https://en.wikipedia.org/w/api.php?format=json&mobileformat=true&action=parse&disabletoc=true&page=${token}`
  const url = `https://en.wikipedia.org/api/rest_v1/page/${type}/${token}`
  req.logger.info({"WikiPage::URL": url})

  const response = await axios.get(url).catch((e: any) => {
    return {
      data: e.response.data,
      status: e.response.status,
    }
  })

  // if (response.status >= 400 && response.status < 500) {
  //   throw new ResourceNotFoundException(req, res)
  // }

  const data = response.data

  if (data.title === "Not found.") {
    onError(req, res, data)
  } else {
    onSuccess(req, res, data)
  }
}

const onError = async (req: Request, res: Response, data: any) => {
  const {category, key, page} = req.query
  const wikiSearch = await doSearch(req, res)
  const wiki: WikiPage = {
    category,
    cp: "",
    externalLinks: [],
    key,
    langlinks: [],
    page,
    search: wikiSearch,
    text: data.detail,
    title: `${data.title}.. :${page}`,
    type: `Error: ${data.type}`,
  }
  res.status(res.statusCode).json(wiki)
}

const onSuccess = async (req: Request, res: Response, data: any) => {
  const {category, cp, key, page} = req.query
  // let text: string
  // tslint:disable-next-line:no-null-keyword
  // let redirect: RegExpMatchArray | null = null
  // if (data.parse) {
  //   const {parse} = data
  //   text = parse.text["*"]
  //   redirect = text.match(REDIRECT_TEST)
  // } else {
  //   const STYLESHEET_RE = /<link rel="stylesheet" href="(?:(?!>).)*>/gm
  //   const SCRIPT_RE = /<script(?:(?!><\/script>).)*><\/script>/gm
  //   const BODY_RE = /<body[^>]*>((.|[\n\r])*)<\/body>/gm
  //   const scripts = data.match(SCRIPT_RE)
  //   console.log("scripts", scripts)
  //   const stylesheets = data.match(STYLESHEET_RE)
  //   console.log("stylesheets", stylesheets)

  //   const body = data.match(BODY_RE)
  //   text = [...stylesheets, ...scripts, ...body].join("\n")

  //   console.log("TEXT", text)
  // }

  // if (redirect) {
  //   // if wiki api returns a redirect document
  //   // -> follow the link
  //   req.logger.info({"WikiPage::redirect": redirect[1]})
  //   req.query.redirect = redirect[1]
  //   await loadPage(req, res)
  // } else {
  const wikiSearch = await doSearch(req, res)
  const wiki: WikiPage = {
    category,
    cp,
    externalLinks: [],
    key,
    langlinks: [],
    page,
    search: wikiSearch,
    text: data,
    title: `${key}: ${cp}`,
    type: "page",
  }

  res.status(res.statusCode).json(wiki)
  // }
}

const doSearch = async (req: Request, res: Response) => {
  req.query.return = true
  await search(req, res)
  return res.locals.wikiSearch
}

export default {
  loadPage,
}
