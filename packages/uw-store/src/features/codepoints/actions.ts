import {CODEPOINTS, FETCH_CODEPOINTS, SET_CODEPOINTS} from "./types"
import {Link, PaginatedCodepointResult} from "@uw/domain"

export const followLink = (link: Link) => {
  return {
    meta: {
      feature: CODEPOINTS,
      method: "GET",
      url: link.href.replace("/api", ""),
    },
    type: FETCH_CODEPOINTS,
  }
}

export const fetchCodepoints = (range?: string, search?: string) => {
  return {
    meta: {
      feature: CODEPOINTS,
      method: "GET",
      url: `/codepoints/${range || undefined}${search}`,
    },
    type: FETCH_CODEPOINTS,
  }
}

export const fetchCodepointsByCategory = (category: string, key: string, search?: string) => {
  // convert plural to singular
  // eg: scripts => script
  category = category.substr(0, category.length - 1)
  return {
    meta: {
      feature: `${CODEPOINTS}`,
      method: "GET",
      purge: true,
      url: `/${category}/${key}/codepoints${search}`,
    },
    type: FETCH_CODEPOINTS,
  }
}

export const setCodepoints = ({
  data,
  purge,
}: {
  data: PaginatedCodepointResult
  purge?: boolean
}) => ({
  meta: {feature: CODEPOINTS, purge},
  payload: data,
  type: SET_CODEPOINTS,
})
