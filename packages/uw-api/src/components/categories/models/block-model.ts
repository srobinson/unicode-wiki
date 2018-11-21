import * as mongoose from "mongoose"
import {CategoryDocument, CategorySchema} from "@uw/domain"

export const BlockDao = mongoose.model<CategoryDocument>("Block", CategorySchema, "blocks")
