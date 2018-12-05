import * as elastic from "elasticsearch"

export const client: elastic.Client = new elastic.Client({
  apiVersion: "6.5",
  host: process.env.ES_URL || "127.0.0.1:9200",
  log: "info",
  sniffInterval: 60000,
  sniffOnStart: true,
})

export const formatResponse = (response: elastic.SearchResponse<{}>) => {
  const hits = response.hits.hits
  const source = hits.map(hit => hit._source)
  return source
}
