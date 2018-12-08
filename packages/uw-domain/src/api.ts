// tslint:disable:no-any
import {Document, PaginateResult} from "mongoose"
import {Link} from "./link"

export type ApiError = Record<string, any>

export type ApiSearchRequest = {
  body?: BodyInit | null
  feature: string
  loading?: boolean
  method: string
  normalizeKey?: string
  purge?: boolean
  url: string
}

export interface ApiSearchAction {
  type: string
  meta: ApiSearchMetadata
}

export interface ApiSearchMetadata {
  body?: BodyInit | null
  feature: string
  label?: string
  loading?: boolean
  method: string
  normalizeKey?: string
  purge?: boolean
  success: any
  throttle?: number
  url: string
}

export interface ApiSearchResponse {
  meta: {
    feature: string
    purge: boolean
  }
  payload: any
  type: string
}

/**
 * Metadata encapsulating user's mobile device
 */
export interface MobileRequestData {
  device: string | undefined
  locale: string | undefined
  platformVersion: string | undefined
  version: string | undefined
}

/**
 * Mongo support for hateoas rel[self|prev|next] entity
 */
export interface ApiResponse extends Document {
  _links: Link[]
}

/**
 * Mongo support for hateoas rel[self|prev|next] pagination
 */
export interface PaginatedApiResult<T> extends PaginateResult<T> {
  _links?: Link[]
}
