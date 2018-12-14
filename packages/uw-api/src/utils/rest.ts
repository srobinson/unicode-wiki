import {ApiResponse, Link, LinkType} from "@uw/domain"
import {objectToString} from "@uw/utils"
import {PaginateResult} from "mongoose"

export const generateLinks = (
  originalUrl: string,
  query: {},
  results: PaginateResult<ApiResponse>,
): Link[] => {
  const links: Link[] = []
  const pathname = originalUrl.split("?")[0]

  if (results.hasPrevPage) {
    const newQuery = Object.assign({}, {...query}, {page: results.prevPage})
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
    const newQuery = Object.assign({}, {...query}, {page: results.nextPage})
    links.push({
      href: `${pathname}?${objectToString(newQuery)}`,
      rel: "next",
      type: LinkType.GET,
    })
  }

  return links
}
