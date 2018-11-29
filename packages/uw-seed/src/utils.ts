import * as path from "path"
import * as fs from "fs"
import {Category, CodepointHexRange} from "@uw/domain"
import {loadJSONFile} from "@uw/utils"
import {CategoryEntryDict} from "./file-parser/Dictionary"
import CategoryEntry from "./unicode-data-parser/domain/CategoryEntry"

export const UCDpath = path.join(__dirname, "../../../../static/UCD/")
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
