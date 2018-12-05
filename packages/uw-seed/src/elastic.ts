// tslint:disable:no-any
// http.max_content_length: 500mb
// https://github.com/elastic/elasticsearch/issues/2902
import * as fs from "fs"
import * as path from "path"
import {Codepoint} from "@uw/domain"
import {getUTCPath} from "./utils"
import DbClient from "./mongo"

const spawn = require("child_process").spawn
const ES_URL = process.env.ES_URL || "localhost:9200"

export default class EsClient {
  public static BULK_INDEX_URL = `${ES_URL}/_bulk?pretty`
  public static BULK_FILE_PATH = path.resolve(__dirname, "./codepoints.txt")
  public static MAPPING_INDEX_URL = `${ES_URL}/unicode-wiki2`
  public static MAPPING_FILE_PATH = getUTCPath("codepoint-mapping.json")
  public static mongo = new DbClient()

  static bulkInsert = async () => {
    await EsClient.createMapping()
    await EsClient.generateBulkInsertFile()
    await EsClient.postBulkInsertFile()
    console.log("EXIT::Index created succesfully")
    process.exit(1)
  }

  static createMapping = async () => {
    spawn(
      "curl",
      [
        "-XPUT",
        "-v",
        EsClient.MAPPING_INDEX_URL,
        "-H",
        "Content-Type: application/json",
        "--data-binary",
        `@${EsClient.MAPPING_FILE_PATH}`,
      ],
      {stdio: "inherit"},
    )
    console.log("Mapping generated")
  }

  static generateBulkInsertFile = async () => {
    const mongo = await EsClient.mongo.getConnection()
    const collection = await mongo.collection(DbClient.CODEPOINT_COLLECTION)
    const codeponts = await collection.find()
    const array = await codeponts.toArray()

    fs.writeFileSync(EsClient.BULK_FILE_PATH, "", {
      encoding: "UTF-8",
    })

    array.forEach((codepoint: any) => {
      const index = {
        index: {
          _id: codepoint.cp,
          _index: "unicode-wiki",
          _type: "codepoints",
        },
      }

      const body = {
        ...codepoint,
        id: codepoint.cp,
        suggest: {
          input: EsClient.generateSuggest(codepoint),
        },
      }

      const indexJson = JSON.stringify(index)
      const bodyJson = JSON.stringify(body)
        .replace(/,"null":null/g, "")
        .replace(/,"null"/g, "")
        .replace(/,"":""/g, "")
        .replace(/"_id":"[0-9a-z]+",/g, "")
      fs.appendFileSync(EsClient.BULK_FILE_PATH, indexJson + "\n" + bodyJson + "\n", {
        encoding: "UTF-8",
      })
    })
    fs.appendFileSync(EsClient.BULK_FILE_PATH, "\n", {
      encoding: "UTF-8",
    })
    console.log("Bulk insert file generated")
  }

  static postBulkInsertFile = async () => {
    spawn(
      "curl",
      [
        "-XPOST",
        "-v",
        EsClient.BULK_INDEX_URL,
        "-H",
        "Content-Type: application/json",
        "--data-binary",
        `@${EsClient.BULK_FILE_PATH}`,
      ],
      {stdio: "inherit"},
    )
    console.log("Bulk insert pushed")
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
          !candidate.match(/all|and|block|for|null|of|letter/) &&
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

EsClient.bulkInsert()
