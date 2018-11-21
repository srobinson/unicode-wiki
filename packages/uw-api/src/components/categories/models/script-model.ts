import * as mongoose from "mongoose"
import {CategoryDocument, CategorySchema} from "@uw/domain"

export const ScriptDao = mongoose.model<CategoryDocument>("Script", CategorySchema, "scripts")
