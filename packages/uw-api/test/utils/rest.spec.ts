import {PaginateResult} from "mongoose"
import {ApiResponse} from "@uw/domain"
import {generateLinks} from "@uw/api/src/utils/rest"

describe("Utils::Rest::generateLinks", () => {
  it("return next/self links", () => {
    const links = generateLinks(
      "/api/endpoint/entity",
      {
        page: 1,
      },
      <PaginateResult<ApiResponse>>{
        hasNextPage: true,
        nextPage: 2,
      },
    )
    expect(links).toEqual([
      {href: "/api/endpoint/entity", rel: "self", type: "GET"},
      {href: "/api/endpoint/entity?page=2", rel: "next", type: "GET"},
    ])
  })

  it("return prev/next/self links", () => {
    const links = generateLinks(
      "/api/endpoint/entity?page=2",
      {
        page: 2,
      },
      <PaginateResult<ApiResponse>>{
        hasNextPage: true,
        hasPrevPage: true,
        nextPage: 3,
        prevPage: 1,
      },
    )
    expect(links).toEqual([
      {href: "/api/endpoint/entity?page=1", rel: "prev", type: "GET"},
      {href: "/api/endpoint/entity?page=2", rel: "self", type: "GET"},
      {href: "/api/endpoint/entity?page=3", rel: "next", type: "GET"},
    ])
  })

  it("return prev/self links", () => {
    const links = generateLinks(
      "/api/endpoint/entity?page=3",
      {
        page: 3,
      },
      <PaginateResult<ApiResponse>>{
        hasNextPage: false,
        hasPrevPage: true,
        prevPage: 2,
      },
    )
    expect(links).toEqual([
      {href: "/api/endpoint/entity?page=2", rel: "prev", type: "GET"},
      {href: "/api/endpoint/entity?page=3", rel: "self", type: "GET"},
    ])
  })
})
