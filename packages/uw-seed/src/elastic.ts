// tslint:disable:no-any
// https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
import {Client} from "elasticsearch"
import {Codepoint} from "@uw/domain"
import DbClient from "./mongo"

export default class EsClient {
  public static mongo = new DbClient()
  public static elastic: Client = new Client({
    host: process.env.searchUrl || "127.0.0.1:9200",
    log: "error",
  })

  static bulkInsert = async () => {
    const bulkBody: any = []
    const mongo = await EsClient.mongo.getConnection()
    const collection = await mongo.collection(DbClient.CODEPOINT_COLLECTION)
    const codeponts = await collection.find()
    const array = await codeponts.toArray()

    array.forEach((codepoint: any) => {
      bulkBody.push({
        index: {
          _id: codepoint.index,
          _index: "codepoints",
          _type: "_doc",
        },
      })

      const body = {
        ...codepoint,
        id: codepoint.cp,
        suggest: {
          index: EsClient.generateSuggest(codepoint),
        },
      }
      bulkBody.push(body)
    })
    EsClient.elastic.bulk({body: bulkBody}).catch(console.error)
    process.exit(1)
  }

  static generateSuggest = (codepoint: Codepoint) => {
    const name_v1 = (codepoint.name_v1 && codepoint.name_v1.replace(/\-/g, " ")) || ""
    const name = (codepoint.name && codepoint.name.replace(/\-/g, " ")) || ""
    const titles = [...name.split(" "), ...name_v1.split(" ")]
    const candidates: string[] = []
    const cache: string[] = []

    titles.forEach((title: string) => {
      title = title.split("-")[0]
      // ignore number in names
      if (!title.match(/([0-9])/g)) {
        candidates.push(title)
      }
    })

    const filtered = candidates
      .map((candidate: string) => candidate.toLowerCase())
      .filter((candidate: string) => {
        if (
          candidate.length > 1 &&
          !candidate.match(/all|and|block|of|letter/) &&
          cache.indexOf(candidate) === -1
        ) {
          cache.push(candidate)
          return true
        }
        return false
      })
      .sort(function(a, b) {
        if (a === b) return 0
        return a > b ? 1 : -1
      })

    return filtered
  }
}
