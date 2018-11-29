import {Category, CodepointHexRange} from "@uw/domain"
import {codepointHexRange} from "@uw/utils"
import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import CategoryEntry from "./domain/CategoryEntry"

export default class CategoryLineParser<K extends string, V extends CategoryEntry>
  implements LineParser<K, V> {
  categories: Category[] = []
  parent = 0
  index = 1
  parentIndex = 0
  prevIndex = 0
  mb?: number
  sb?: number
  childRanges: CodepointHexRange[] = []

  parse(cols: string[], dictionary: Dictionary<string, CategoryEntry>): void {
    // skip over comments and empty lines
    if (/^#|^$/.test(cols[0]) === false) {
      const type = cols[0].trim()
      const range = generateRanges(cols[1])
      const title = cols[2].trim()
      const key = formatKey(cols[2].trim())

      if (type === "sg") {
        this.parent = 0
        this.sb = undefined
        this.mb = undefined
      } else if (!this.mb && type === "mb") {
        this.mb = this.index - 1
        this.sb = undefined
      } else if (!this.sb && ["pb", "sb"].includes(type)) {
        this.sb = this.index - 1
      } else if (this.sb && type === "mb") {
        this.sb = undefined
      }

      const entry: Category = {
        index: this.index,
        key,
        level: this.sb ? 2 : this.mb ? 1 : 0,
        parent: this.sb || this.mb || this.parent,
        title,
      }
      if (range) {
        Object.assign(entry, {range})
      }

      this.index++

      dictionary.put(`${entry.parent}:${entry.index}`, new CategoryEntry(entry))
    }
  }
}

const formatKey = (input: string) =>
  input
    .replace(/[\(\),\s\/\']/gi, "-")
    .replace("---", "-")
    .replace("--", "-")
    .replace("- ", "")
    .toLowerCase()

const generateRanges = (input: string) => {
  if (!input) {
    return
  }
  const parts = input.split(",")
  return parts.map(part => codepointHexRange(part.trim()))
}
