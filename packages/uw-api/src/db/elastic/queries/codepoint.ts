// tslint:disable:no-any
import {SearchResponse} from "elasticsearch"
import {CodepointHexRange} from "@uw/domain"
import {client, formatResponse} from "../client"

const type = "codepoints"
const index = "unicode-wiki"

export const getById = async (id: number) => {
  const result: SearchResponse<{}> = await client.search({
    body: {
      query: {
        match: {
          index: id,
        },
      },
    },
    index,
    type,
  })

  return formatResponse(result)
}

export const getByUCP = async (ucp: string) => {
  const cp = parseInt(ucp, 16)
  return await getById(cp)
}

export const getByRange = async (
  range: CodepointHexRange = {from: "0000", to: "A000"},
  page = 1,
  perPage = 20,
) => {
  const result = await client.search({
    body: {
      query: {
        constant_score: {
          filter: {
            range: {
              cp: {
                gte: range.from,
                lte: range.to,
              },
            },
          },
        },
      },
    },
    from: (page - 1) * perPage,
    index,
    size: perPage,
    type,
  })
  return formatResponse(result)
}

export const suggest = async (text: string) => {
  if (!text) {
    return []
  }
  const response = await client.search({
    body: {
      _source: ["suggest"],
      suggest: {
        suggest: {
          completion: {
            field: "suggest",
            size: 20,
            skip_duplicates: true,
          },
          prefix: text,
        },
      },
    },
  })

  // @ts-ignore
  const results = response.suggest.suggest[0].options
    .map((result: any) => result.text)
    .sort((a: any, b: any) => {
      if (a === b) return 0
      return a > b ? 1 : -1
    })

  return results
}

export const search = async (q: string) => {
  if (!q) {
    return []
  }
  const response = await client.search({
    body: {
      query: {
        bool: {
          must: [
            {
              match: {
                suggest: {
                  operator: "and",
                  query: q,
                },
              },
            },
          ],
        },
      },
    },
    index,
    type,
  })
  return formatResponse(response)
}

export default {
  getById,
  getByRange,
  getByUCP,
  suggest,
}
