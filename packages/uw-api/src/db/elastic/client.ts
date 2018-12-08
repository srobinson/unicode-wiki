// tslint:disable
import * as elastic from "elasticsearch"
import "../../config"

export const client: elastic.Client = new elastic.Client({
  host: process.env.ES_URL || "localhost:9200",
  log: "trace",
})

export const formatResponse = (response: elastic.SearchResponse<{}>) => {
  const hits = response.hits.hits
  const source = hits.map(hit => hit._source)
  return source
}
