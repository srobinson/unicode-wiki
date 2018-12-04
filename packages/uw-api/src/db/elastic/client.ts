import * as elastic from "elasticsearch"

export default new elastic.Client({
  apiVersion: "2.3",
  host: process.env.searchUrl || "127.0.0.1:9200",
  log: "info",
  sniffInterval: 60000,
  sniffOnStart: true,
})

export const formatResponse = (response: elastic.SearchResponse<{}>) => {
  const hits = response.hits.hits
  const source = hits.map(hit => hit._source)
  return source
}
