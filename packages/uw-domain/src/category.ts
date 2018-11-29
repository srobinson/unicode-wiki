import {Schema} from "mongoose"
import {ApiResponse} from "./api"
import {CodepointHexRange} from "./codepoint"
import {LinkSchema} from "./link"

export interface CategoryState {
  readonly docs: Category[]
  readonly loading: boolean
}

export interface BlockState extends CategoryState {}
export interface ScriptState extends CategoryState {}
export interface SymbolState extends CategoryState {}

export interface ExplorerState {
  readonly categoryType: CategoryType
  readonly categoryTitle: string
}

export type CategoryType = "blocks" | "scripts" | "symbols" | "search"

/**
 * Category entity definition
 */
export interface Category {
  childRanges?: CodepointHexRange[]
  hasChildren?: boolean
  index: number
  key: string
  level: number
  parent: number
  range?: CodepointHexRange[]
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
  level: Number,
  parent: Number,
  range: [
    {
      from: String,
      to: String,
    },
  ],
  title: String,
})

/**
 * Supported category types definition
 */
export enum CATEGORY_TYPE {
  BLOCK = "BLOCKS",
  SCRIPT = "SCRIPTS",
  SYMBOL = "SYMBOLS",
}
