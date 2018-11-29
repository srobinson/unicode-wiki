import {BlockDao, ScriptDao, SymbolDao} from "./models"
import {CategoryDocument} from "@uw/domain"

export const getById = async (modelType: string, id: number) => {
  const model = getModel(modelType)
  const result = await model.findOne({index: id})
  if (!result) {
    return undefined
  }
  return result
}

export const getByKey = async (modelType: string, key: string) => {
  const model = getModel(modelType)
  const result = await model.findOne({key})
  if (!result) {
    return undefined
  }
  return result
}

export const getByParent = async (modelType: string, parent: number) => {
  const model = getModel(modelType)
  const q = !parent ? {} : {parent}
  const sort = model === BlockDao ? "index" : "key"
  const result = await model.find(q, {}, {sort: sort})
  if (!result) {
    return undefined
  }
  return sortParentChild(result)
  // return result
}

const getModel = (modelType: string) =>
  modelType === "symbol" ? SymbolDao : modelType === "script" ? ScriptDao : BlockDao

export const sortParentChild = (result: CategoryDocument[]) => {
  const arr: CategoryDocument[] = []
  result
    .filter((category: CategoryDocument) => category.parent === 0)
    .forEach((category: CategoryDocument) => {
      arr.push(category)
      result
        .filter((child: CategoryDocument) => child.parent === category.index)
        .forEach((child: CategoryDocument) => {
          arr.push(child)
          result
            .filter((child2: CategoryDocument) => child2.parent === child.index)
            .forEach((child2: CategoryDocument) => arr.push(child2))
        })
    })
  return arr
}

// 0:1
// 1:21
// 1:43
// 1:67
// 0:2
// 2:12
// 2:13

// result.sort((a: CategoryDocument, b: CategoryDocument) => {
//   if (a.parent === b.parent) {
//     return a.index - b.index
//   }
//   return a.parent > b.parent ? 1 : -1
//   return -1

// result
// })

// tslint:disable:no-any
// const getNestedChildren = (arr: CategoryDocument[], parent: number) => {
//   const out: any[] = []
//   for (let i in arr) {
//     if (arr[i].parent === parent) {
//       let children = getNestedChildren(arr, arr[i].index)
//       if (children.length) {
//         arr[i].children = children
//       }
//       out.push(arr[i])
//     }
//   }
//   return out
// }

export default {
  getById,
  getByParent,
}
