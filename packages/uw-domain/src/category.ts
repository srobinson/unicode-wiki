import {Schema} from "mongoose"
import {ApiResponse} from "./api"
import {CodepointHexRange} from "./codepoint"
import {LinkSchema} from "./link"

/**
 * Category entity definition
 */
export interface Category {
  childRanges?: CodepointHexRange[]
  hasChildren?: boolean
  index: number
  key: string
  parent: number
  range?: CodepointHexRange
  title: string
}

/**
 * Mongoose category document
 */
export interface CategoryDocument extends ApiResponse, Category {}

/**
 * Mongoose category schema
 * ! keep in sync with Category model
 */
export const CategorySchema = new Schema({
  _links: LinkSchema,
  hasChildren: Boolean,
  index: Number,
  key: String,
  parent: Number,
  range: {
    from: String,
    to: String,
  },
  title: String,
})

/**
 * Supported category types definition
 */
export enum CategoryTypeEnum {
  BLOCK = "blocks",
  SCRIPT = "scripts",
  SYMBOL = "symbols",
}
