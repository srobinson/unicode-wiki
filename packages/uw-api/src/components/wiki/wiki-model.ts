import * as mongoose from "mongoose"
import {WikiPageSchema, WikiSearchSchema} from "@uw/domain"

export const WikiSearch = mongoose.model("WikiSearch", WikiSearchSchema)

export const WikiPage = mongoose.model("WikiPage", WikiPageSchema)
