import {Request} from "express"
import {Link, LinkType} from "@uw/domain"
import {objectToString} from "@uw/utils"
import {PaginateResult} from "mongoose"

// tslint:disable-next-line:no-any
export const generateLinks = (req: Request, results: PaginateResult<any>): Link[] => {
  const links: Link[] = []
  const originalUrl = req.originalUrl
  const pathname = req.originalUrl.split("?")[0]

  if (results.hasPrevPage) {
    const newQuery = Object.assign({}, {...req.query}, {page: results.prevPage})
    links.push({
      href: `${pathname}?${objectToString(newQuery)}`,
      rel: "prev",
      type: LinkType.GET,
    })
  }

  links.push({
    href: originalUrl,
    rel: "self",
    type: LinkType.GET,
  })

  if (results.hasNextPage) {
    const newQuery = Object.assign({}, {...req.query}, {page: results.nextPage})
    links.push({
      href: `${pathname}?${objectToString(newQuery)}`,
      rel: "next",
      type: LinkType.GET,
    })
  }

  return links
}
