import * as mongoose from "mongoose"
import {CodepointDocument, CodepointSchema, PaginatedCodepointSchema} from "@uw/domain"

export const Codepoint = mongoose.model<CodepointDocument>(
  "Codepoint",
  CodepointSchema,
  "codepoints",
)

export const PaginatedCodepoint = mongoose.model<CodepointDocument>(
  "PaginatedCodepoint",
  PaginatedCodepointSchema,
  "codepoints",
)

export default {Codepoint, PaginatedCodepoint}
