// tslint:disable:no-any
// http.max_content_length: 500mb
// https://github.com/elastic/elasticsearch/issues/2902
import * as fs from "fs"
import * as tmp from "tmp"
import * as ora from "ora"
import * as rimraf from "rimraf"
import {Codepoint} from "@uw/domain"
import {getUTCPath} from "./utils"
import DbClient from "./mongo"

const spawn = require("child_process").spawnSync
const ES_URL = process.env.ES_URL || "localhost:9200"

const mongo = new DbClient()
const spinner = ora(`Creating elasticsearch index`)
let counter = 1

export default class EsClient {
  public static INDEX_NAME = `unicode-wiki2`
  public static MAPPING_INDEX_URL = `${ES_URL}/${EsClient.INDEX_NAME}`
  public static BULK_INDEX_URL = `${EsClient.MAPPING_INDEX_URL}/_bulk?pretty`
  public static BULK_FILE_TMP_PATH = tmp.dirSync().name
  public static MAPPING_FILE_PATH = getUTCPath("codepoint-mapping.json")

  bulkInsert = async () => {
    spinner.start()
    await spawn(`curl -X DELETE -v ${EsClient.MAPPING_INDEX_URL}`, {stdio: "inherit", shell: true})
    await this.createMapping()
    await this.createIndex()
    spinner.info(`Cleaning up: Deleting tmp dir: ${EsClient.BULK_FILE_TMP_PATH}`)
    rimraf.sync(EsClient.BULK_FILE_TMP_PATH)
    spinner.succeed("Index created succesfully")
    process.exit(1)
  }

  createMapping = async () => {
    spinner.info(`Generating mapping`)
    await spawn(
      `curl -XPUT -v ${
        EsClient.MAPPING_INDEX_URL
      } -H 'Content-Type: application/json' --data-binary @${EsClient.MAPPING_FILE_PATH}`,
      {stdio: "inherit", shell: true},
    )
  }

  createIndex = async () => {
    spinner.info("Create index")
    const db = await mongo.getConnection()
    const collection = db.collection(DbClient.CODEPOINT_COLLECTION)
    const cursor = collection
      .find()
      .sort({index: 1})
      .batchSize(75000)

    let fileName = this.createBatchDirAndFile()
    let doc = undefined
    spinner.info(`Generating bulk import file ${fileName}`)
    for (doc = await cursor.next(); doc != undefined; doc = await cursor.next()) {
      fs.appendFileSync(
        fileName,
        JSON.stringify({
          index: {
            _id: doc.cp,
            _index: EsClient.INDEX_NAME,
            _type: "codepoints",
          },
        }) +
          "\n" +
          this.sanitizeDocument({
            ...doc,
            id: doc.cp,
            suggest: {
              input: this.generateSuggest(doc),
            },
          }) +
          "\n",
        {
          encoding: "UTF-8",
        },
      )

      if (doc.index % 50000 === 0) {
        await this.postBulkInsertFile(fileName)
        fileName = await this.generateNextBatchFile(fileName)
        spinner.info(`Generating ${fileName}`)
      }
    }
    // push the last generated index
    await this.postBulkInsertFile(fileName)
    ora("Bulk inserts complete")
  }

  sanitizeDocument = (body: string) =>
    JSON.stringify(body)
      .replace(/,"null":null/g, "")
      .replace(/,"null"/g, "")
      .replace(/,"":""/g, "")
      .replace("_id", "mongo_id")

  createBatchDirAndFile = () => {
    if (fs.existsSync(EsClient.BULK_FILE_TMP_PATH)) {
      rimraf.sync(EsClient.BULK_FILE_TMP_PATH)
    }
    fs.mkdirSync(EsClient.BULK_FILE_TMP_PATH)
    const fileName = `${EsClient.BULK_FILE_TMP_PATH}/index-${counter}`
    fs.writeFileSync(fileName, "", {
      encoding: "UTF-8",
    })
    return fileName
  }

  generateNextBatchFile = async (fileName: string) => {
    fs.appendFileSync(fileName, "\n", {
      encoding: "UTF-8",
    })
    counter++
    fileName = `${EsClient.BULK_FILE_TMP_PATH}/index-${counter}`
    fs.writeFileSync(fileName, "", {
      encoding: "UTF-8",
    })
    return fileName
  }

  postBulkInsertFile = async (file: string) => {
    spinner.info(`PUTing ${file}`)
    await spawn(
      `curl -X POST -v ${
        EsClient.BULK_INDEX_URL
      } -H 'Content-Type: application/json' --data-binary @${file}`,
      {stdio: "inherit", shell: true},
    )
    spinner.info(`Bulk file ${file} pushed`)
  }

  generateSuggest = (codepoint: Codepoint) => {
    const name_v1 = (codepoint.name_v1 && codepoint.name_v1.replace(/\-/g, " ")) || ""
    const name = (codepoint.name && codepoint.name.replace(/\-/g, " ")) || ""
    const header = codepoint["block_header"] || ""
    const subheader = codepoint["block_subheader"] || ""
    const titles = [
      ...name.split(" "),
      ...name_v1.split(" "),
      ...header.spint(" "),
      ...subheader.split(" "),
      ...codepoint["general_category"].value.split(" "),
      ...codepoint["script"].value.split(" "),
      ...codepoint["block"].value.split(" "),
    ]
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
