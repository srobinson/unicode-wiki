import {BlockDao, ScriptDao, SymbolDao} from "./models"

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
  const result = await model.find(q)
  if (!result) {
    return undefined
  }
  return result
}

const getModel = (modelType: string) =>
  modelType === "symbol" ? SymbolDao : modelType === "script" ? ScriptDao : BlockDao

export default {
  getById,
  getByParent,
}
