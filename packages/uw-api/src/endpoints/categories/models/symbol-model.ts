import * as mongoose from "mongoose"
import {CategoryDocument, CategorySchema} from "@uw/domain"

export const SymbolDao = mongoose.model<CategoryDocument>("Symbol", CategorySchema, "symbols")
