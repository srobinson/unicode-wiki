import {Codepoint, PaginatedCodepoint} from "./codepoint-model"
import {CodepointDocument, PaginatedCodepointResult} from "@uw/domain"
import {PER_PAGE} from "./defaults"

export const getById = async (id: number): Promise<CodepointDocument | undefined> => {
  const result: CodepointDocument | null = await Codepoint.findOne({index: id})
  if (!result) {
    return undefined
  }
  return result
}

export const getByUCP = async (ucp: string): Promise<CodepointDocument | undefined> => {
  const id = parseInt(ucp, 16)
  const result = await getById(id)
  return result
}

export const find = async (
  q: {} = {},
  page: number = 1,
  perPage: number = PER_PAGE,
  sort?: object,
): Promise<PaginatedCodepointResult> => {
  console.log("qq", q)

  const result: PaginatedCodepointResult = await PaginatedCodepoint.paginate(q, {
    limit: perPage,
    page,
    sort: sort ? sort : {index: 1},
  })
  return result
}

export default {
  find,
  getById,
  getByUCP,
}
