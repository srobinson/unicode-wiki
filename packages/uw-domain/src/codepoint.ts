import * as mongoose from "mongoose"
import * as paginate from "mongoose-paginate-v2"
import {ApiResponse, PaginatedApiResult} from "./api"
import {LinkSchema} from "./link"

export interface CodepointState {
  readonly loading: boolean
  readonly result?: PaginatedCodepointResult
}

export interface Codepoint {
  cp: string
  index: number
  name?: string
  name_v1?: string
}

export interface CodepointHexRange {
  from: string
  to?: string
}

export interface CodepointIndexRange {
  from: number
  to?: number
}

export interface CodepointDocument extends ApiResponse, Codepoint {}

export interface PaginatedCodepointResult extends PaginatedApiResult<CodepointDocument> {}

const schema = {
  _links: LinkSchema,
  cp: String,
  index: Number,
  name: String,
  name_v1: String,
}

const CodepointSchema = new mongoose.Schema(schema)

const PaginatedCodepointSchema = new mongoose.Schema(schema).plugin(paginate)

export {CodepointSchema, PaginatedCodepointSchema}
