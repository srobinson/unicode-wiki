import {Schema} from "mongoose"
import {ApiResponse} from "./api"
import {LinkSchema} from "./link"

/**
 * WikiPage entity definition
 */
export interface WikiPage {
  category: string // collectionId
  cp: string // codepoint
  externalLinks: []
  key: string // groupId
  langlinks: []
  text: string
  title: string
  type: string
}

/**
 * Mongoose wiki document
 */
export interface WikiPageDocument extends ApiResponse, WikiPage {}

/**
 * Mongoose wiki schema
 * ! keep in sync with Category model
 */
export const WikiPageSchema = new Schema({
  _links: LinkSchema,
  category: String, // collectionId
  cp: String, // codepoint
  externalLinks: {type: Array, default: []},
  key: String, // groupId
  langlinks: {type: Array, default: []},
  text: String,
  title: String,
  type: String,
})
