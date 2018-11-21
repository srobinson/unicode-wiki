import {Schema} from "mongoose"

export interface Links {
  links: Link[]
}

export interface Link {
  href: string
  rel: string
  type: LinkType
}

export const LinkSchema = new Schema({
  href: String,
  rel: String,
  type: String,
})

export enum LinkRel {
  NEXT = "next",
  PREV = "prev",
  SELF = "self",
}

export enum LinkType {
  GET = "GET",
  DELETE = "DELETE",
  PATCH = "PATCH",
  POST = "POST",
  PUT = "PUT",
}
