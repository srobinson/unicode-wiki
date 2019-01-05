import * as path from "path"
import {Codepoint} from "@uw/domain"
import {loadJSONFile} from "@uw/utils"

export const UCDpath = path.join(__dirname, "../UCD/")
export const getUTCPath = (name: string) => path.join(UCDpath, name)
export const loadUTCFile = (name: string) => loadJSONFile(getUTCPath(name))

export const generateSuggest = (codepoint: Codepoint) => {
  const name_v1 = (codepoint.name_v1 && codepoint.name_v1.replace(/\-/g, " ")) || ""
  const name = (codepoint.name && codepoint.name.replace(/\-/g, " ")) || ""
  const header = codepoint["block_header"] || ""
  const subheader = codepoint["block_subheader"] || ""
  const emojiHeader = codepoint["emoji_header"] || ""
  const emojiSubheader = codepoint["emoji_subheader"] || ""
  const titles = [
    ...name.split(" "),
    ...name_v1.split(" "),
    ...header.replace(/[^[a-zA-z0-9\s]]*/g, "").split(" "),
    ...subheader.replace(/[^[a-zA-z0-9\s]]*/g, "").split(" "),
    ...emojiHeader.split(" "),
    ...emojiSubheader.split(" "),
    ...codepoint["general_category"].value.split(" "),
    ...codepoint["script"].value.split(" "),
    ...codepoint["block"].value.split(" "),
  ]
  const candidates: string[] = []
  const cache: string[] = []

  titles.forEach((title: string) => {
    title = title.split("-")[0]
    // ignore number in names
    if (!title.match(/([0-9])/g)) {
      candidates.push(title)
    }
  })

  if (codepoint["emoji"]) {
    candidates.push("emoji")
  }

  const filtered = candidates
    .map((candidate: string) => candidate.toLowerCase())
    .filter((candidate: string) => {
      if (
        candidate.length > 1 &&
        !candidate.match(/all|and|block|for|null|of|letter|with/) &&
        cache.indexOf(candidate) === -1
      ) {
        cache.push(candidate)
        return true
      }
      return false
    })
    .sort(function(a, b) {
      if (a === b) return 0
      return a > b ? 1 : -1
    })

  return filtered
}
