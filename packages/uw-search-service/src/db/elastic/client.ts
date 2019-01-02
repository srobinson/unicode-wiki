// tslint:disable:no-any
import * as elastic from "elasticsearch"
import "../../config"
import {logger} from "@uw/logging"

export const client: elastic.Client = new elastic.Client({
  host: process.env.ES_URL || "localhost:9200",
  log: "trace",
})

// export default client

client.cluster.health({}, (err: any, resp: any) => {
  logger.info("-- Client Health --", resp)
})

export const formatResponse = (response: elastic.SearchResponse<any>) => {
  const hits = response.hits.hits
  const source = hits.map(hit => hit._source)
  return source
}
