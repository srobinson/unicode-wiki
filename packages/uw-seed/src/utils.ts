import * as path from "path"
import {Category, CodepointHexRange} from "@uw/domain"
import {loadJSONFile} from "@uw/utils"

export const UCDpath = path.resolve(__dirname, "../../../../static/UCD/")
export const getUTCPath = (name: string) => path.join(UCDpath, name)
export const loadUTCFile = (name: string) => loadJSONFile(getUTCPath(name))

export const updateCategoriesWithHasChildrenFlag = (file: string) => {
  const categories: Category[] = loadUTCFile(file)
  categories.forEach(category => {
    recurse(categories, category)
  })
  return categories
}

const recurse = (categories: Category[], category: Category) => {
  let currentIndex = -1
  let childRanges: CodepointHexRange[] = []
  categories.filter(c => c.parent === category.index).forEach(child => {
    if (currentIndex !== category.index) {
      currentIndex = category.index
      childRanges = []
    }
    if (child.range) {
      childRanges.push(child.range)
    }

    categories.filter(c => c.parent && c.parent === child.index).forEach(child2 => {
      if (child2.range) {
        childRanges.push(child2.range)
      }
    })

    if (childRanges) {
      category.childRanges = [...childRanges]
    }
  })
}
