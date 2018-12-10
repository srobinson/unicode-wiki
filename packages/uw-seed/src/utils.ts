import * as path from "path"
import * as fs from "fs"
import {Category, Codepoint, CodepointHexRange} from "@uw/domain"
import {loadJSONFile} from "@uw/utils"
import {CategoryEntryDict} from "./file-parser/Dictionary"
import CategoryEntry from "./unicode-data-parser/domain/CategoryEntry"

export const UCDpath = path.join(__dirname, "../UCD/")
export const getUTCPath = (name: string) => path.join(UCDpath, name)
export const loadUTCFile = (name: string) => loadJSONFile(getUTCPath(name))

export const updateCategoriesWithHasChildrenFlag = async (
  name: string,
  dict: CategoryEntryDict,
) => {
  const categories: Category[] = dict.getValues().map((entry: CategoryEntry) => entry.category)
  categories.forEach(category => {
    recurse(categories, category)
  })
  fs.writeFileSync(path.join(UCDpath, `${name}.json`), JSON.stringify(categories, undefined, 2))
}

const recurse = async (categories: Category[], category: Category) => {
  let currentIndex = -1
  let childRanges: CodepointHexRange[] = []
  categories.filter(c => c.parent === category.index).forEach(child => {
    if (currentIndex !== category.index) {
      currentIndex = category.index
      childRanges = []
    }
    if (child.range) {
      childRanges.push(...child.range)
    }

    categories.filter(c => c.parent && c.parent === child.index).forEach(child2 => {
      if (child2.range) {
        childRanges.push(...child2.range)
      }
    })

    if (childRanges) {
      category.childRanges = [...childRanges]
    }
  })
}

// const sortParentChild = (result: Category[]) => {
//   const arr: Category[] = []
//   result.filter((category: Category) => category.parent === 0).forEach((category: Category) => {
//     arr.push(category)
//     result
//       .filter((child: Category) => child.parent === category.index)
//       .forEach((child: Category) => arr.push(child))
//   })
//   return arr
// }

export const generateSuggest = (codepoint: Codepoint) => {
  const name_v1 = (codepoint.name_v1 && codepoint.name_v1.replace(/\-/g, " ")) || ""
  const name = (codepoint.name && codepoint.name.replace(/\-/g, " ")) || ""
  const header = codepoint["block_header"] || ""
  const subheader = codepoint["block_subheader"] || ""
  const titles = [
    ...name.split(" "),
    ...name_v1.split(" "),
    ...header.split(" "),
    ...subheader.split(" "),
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
