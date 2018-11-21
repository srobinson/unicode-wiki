import * as Category from "./category-dao"
import {Request, Response} from "express"
import {CategoryDocument, CodepointHexRange, ResourceNotFoundException} from "@uw/domain"
import {hexRangeOrQuery} from "@uw/utils"
import * as codepointController from "../codepoints"

export const getCategoryById = async (modelType: string, req: Request, res: Response) => {
  const index = req.params.id
  const category = await Category.getById(modelType, index)
  if (!category) {
    res.status(404)
    throw new ResourceNotFoundException(req.originalUrl)
  }
  res.status(200).json(category)
}

export const getCategoriesByParent = async (modelType: string, req: Request, res: Response) => {
  const id = req.params.id
  const categories = await Category.getByParent(modelType, id)
  if (!(categories && categories.length)) {
    res.status(404)
    throw new ResourceNotFoundException(req.originalUrl)
  }
  res.status(200).json(categories)
}

export const getCodepointsByCategoryById = async (
  modelType: string,
  req: Request,
  res: Response,
) => {
  const categoryId = req.params.id
  let category: CategoryDocument | undefined
  if (isNaN(categoryId)) {
    category = await Category.getByKey(modelType, categoryId)
  } else {
    category = await Category.getById(modelType, categoryId)
  }

  if (!(category && (category.range || category.childRanges))) {
    res.status(404)
    throw new ResourceNotFoundException(req.originalUrl)
  }
  const categoryRange: CodepointHexRange = category.get("range") || []
  const childRanges: CodepointHexRange[] = category.get("childRanges") || []
  const ranges = [categoryRange, ...childRanges]
    .filter(range => Object.keys(range).length)
    .map(range => `${range.from}:${range.to}`)
  const q = hexRangeOrQuery(ranges)
  const cps = await codepointController.findCodepoints(req, res, q)
  return cps
}

export default {
  getCategoriesByParent,
  getCategoryById,
  getCodepointsByCategoryById,
}
