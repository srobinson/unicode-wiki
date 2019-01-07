// tslint:disable:no-any
import {Document, PaginateResult} from "mongoose"
import {Link} from "./link"

export type ApiError = Record<string, any>

// test no-op version
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
  query?: string
  queryResolver?: string
  success: any
  throttle?: number
  url?: string
  variables?: object
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
 * Mongo support for Pagination
 */

export interface PaginationQuery {
  page: string | number
  perPage: string | number
  q?: string
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
