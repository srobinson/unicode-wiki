// tslint:disable:no-any
import {SearchResponse} from "elasticsearch"
import {CodepointHexRange, jsonifyError} from "@uw/domain"
import client, {formatResponse} from "../client"
import {logger} from "@uw/logging"

const index = "unicode-wiki"
const type = "codepoints"

export const getById = (id: number) =>
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

export const getByUCP = (ucp: string) => {
  const cp = parseInt(ucp, 16)
  return getById(cp)
}

export const getByRange = (
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

export const suggest = (text: string) =>
  client
    .suggest({
      body: {
        suggest: {
          completion: {
            field: "suggest",
            size: 20,
            unicode_aware: true,
          },
          text,
        },
      },
      index,
    })
    .then(response => {
      const suggestions = response.suggest[0].options
      const results = suggestions
        .sort((a: any, b: any) => {
          if (a.text === b.text) return 0
          return a.text > b.text ? 1 : -1
        })
        .map((suggestion: any) => suggestion.text)
      return results
    })
    .catch(e => logger.error(jsonifyError(e)))

export default {
  getById,
  getByRange,
  getByUCP,
}
