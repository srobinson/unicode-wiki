import {Schema} from "mongoose"
import {ApiResponse} from "./api"
import {LinkSchema} from "./link"

/**
 * WikiSearch entity definition
 */
export interface WikiSearch {
  category: string // collectionId
  key: string // groupId
  results: []
}

/**
 * Mongoose WikiSearch document
 */
export interface WikiSearchDocument extends ApiResponse, WikiSearch {}

/**
 * Mongoose WikiSearch schema
 */
export const WikiSearchSchema = new Schema({
  _links: LinkSchema,
  collectionId: String,
  groupId: String,
  results: Array,
})
