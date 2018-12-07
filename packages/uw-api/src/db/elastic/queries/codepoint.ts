// tslint:disable:no-any
import {SearchResponse} from "elasticsearch"
import {CodepointHexRange, jsonifyError} from "@uw/domain"
import {logger} from "@uw/logging"
import {client, formatResponse} from "../client"

const type = "codepoints"
const index = "unicode-wiki"

export const getById = async (id: number) =>
  client
    .search({
      body: {
        query: {
          ids: {
            values: [id],
          },
        },
      },
      index,
      type,
    })
    .then((result: SearchResponse<{}>) => formatResponse(result))
    .catch(e => logger.error(jsonifyError(e)))

export const getByUCP = async (ucp: string) => {
  const cp = parseInt(ucp, 16)
  return getById(cp)
}

export const getByRange = async (
  range: CodepointHexRange = {from: "0000", to: "A000"},
  page = 1,
  perPage = 20,
) => {
  const from = parseInt(range.from, 16)
  const to = (range.to && parseInt(range.to, 16)) || range.from
  return client
    .search({
      body: {
        query: {
          constant_score: {
            filter: {
              range: {
                cp: {
                  gte: from,
                  lte: to,
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
    .then(result => formatResponse(result))
    .catch(e => logger.error(jsonifyError(e)))
}

export const suggest = async (text: string) => {
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

export default {
  getById,
  getByRange,
  getByUCP,
  suggest,
}
