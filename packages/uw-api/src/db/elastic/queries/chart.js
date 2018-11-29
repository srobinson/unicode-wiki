/* eslint-disable no-console, camelcase */
import client, { formatResponse, formatError } from '../client'

const index = 'unicode-wiki'
const type = 'charts'

// https://github.com/elastic/elasticsearch-js/issues/339

export const getCharts = (page = 1, perPage = 20) => client.search({
  index,
  type,
  from: (page - 1) * perPage,
  size: perPage,
  body: {
    query: {
      match_all: {}
    }
  }
})
.then(result => formatResponse(result))
.catch(e => formatError(e))

export const getByKey = (key) => client.search({
  index,
  type,
  body: {
    query: {
      ids: {
        values: [key]
      }
    }
  }
})
.then(result => formatResponse(result))
.catch(e => formatError(e))

export default {
  getCharts,
  getByKey
}
