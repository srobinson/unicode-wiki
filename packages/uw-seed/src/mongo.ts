// sudo chown -R `id -u` /data/db
import * as ora from "ora"
import {MongoClient, Db, Collection} from "mongodb"
import {CodePointDict, ExpandedValueDict} from "./file-parser/Dictionary"
import {oraOpts} from "@uw/logging"
import {loadUTCFile} from "./utils"
import "./config"

/**
 *
 */
export default class DbClient {
  public static readonly UNICODE_DB = "unicode-wiki"
  public static readonly CODEPOINT_COLLECTION = "codepoints"
  public static readonly SCRIPTS_COLLECTION = "scripts"
  public static readonly SYMBOLS_COLLECTION = "symbols"
  public static readonly BLOCKS_COLLECTION = "blocks"
  public db!: Db

  public async createCollection(codePointDict: CodePointDict) {
    try {
      await this.connect()
      const unicodepoints = this.db.collection(DbClient.CODEPOINT_COLLECTION)
      await this.dropCollection(
        unicodepoints,
        `${DbClient.UNICODE_DB}/${DbClient.CODEPOINT_COLLECTION}`,
      )

      await this.populateCollection(
        codePointDict.getValues(),
        unicodepoints,
        `${DbClient.UNICODE_DB}/${DbClient.CODEPOINT_COLLECTION}`,
      )
      await this.createIndex(
        unicodepoints,
        `${DbClient.UNICODE_DB}/${DbClient.CODEPOINT_COLLECTION}/index`,
        {index: 1},
      )
      await this.createIndex(
        unicodepoints,
        `${DbClient.UNICODE_DB}/${DbClient.CODEPOINT_COLLECTION}/cp`,
        {cp: 1},
      )
      await this.createIndex(
        unicodepoints,
        `${DbClient.UNICODE_DB}/${DbClient.CODEPOINT_COLLECTION}/block.value`,
        {
          "block.value": 1,
          index: 1,
        },
      )
    } catch (e) {
      console.log(e)
    }
  }

  public async createCategories(blockDict: ExpandedValueDict) {
    // const scripts_json = updateCategoriesWithHasChildrenFlag("scripts.json")
    // const symbols_json = updateCategoriesWithHasChildrenFlag("symbols.json")

    const scripts_json = loadUTCFile("scripts.json")
    const symbols_json = loadUTCFile("symbols.json")

    await this.connect()

    const scripts = this.db.collection(DbClient.SCRIPTS_COLLECTION)
    await this.dropCollection(scripts, DbClient.SCRIPTS_COLLECTION)
    await this.populateCollection(
      scripts_json,
      scripts,
      `${DbClient.UNICODE_DB}/${DbClient.SCRIPTS_COLLECTION}`,
    )
    await this.createIndex(scripts, `${DbClient.UNICODE_DB}/${DbClient.SCRIPTS_COLLECTION}/index`, {
      index: 1,
    })
    await this.createIndex(
      scripts,
      `${DbClient.UNICODE_DB}/${DbClient.SCRIPTS_COLLECTION}/parent`,
      {parent: 1},
    )

    const symbols = this.db.collection(DbClient.SYMBOLS_COLLECTION)
    await this.dropCollection(symbols, DbClient.SYMBOLS_COLLECTION)
    await this.populateCollection(
      symbols_json,
      symbols,
      `${DbClient.UNICODE_DB}/${DbClient.SYMBOLS_COLLECTION}`,
    )
    await this.createIndex(symbols, `${DbClient.UNICODE_DB}/${DbClient.SYMBOLS_COLLECTION}/index`, {
      index: 1,
    })
    await this.createIndex(
      symbols,
      `${DbClient.UNICODE_DB}/${DbClient.SYMBOLS_COLLECTION}/parent`,
      {parent: 1},
    )

    const blocks = this.db.collection(DbClient.BLOCKS_COLLECTION)
    const blocks_docs = blockDict.getValues().map((block, i) => ({
      index: i + 1,
      key: block.name.replace(/\s/g, "-").toLowerCase(),
      parent: 0,
      range: {
        from: block.key.split("..")[0],
        to: block.key.split("..")[1],
      },
      title: block.name,
    }))
    await this.dropCollection(blocks, DbClient.SYMBOLS_COLLECTION)
    await this.populateCollection(
      blocks_docs,
      blocks,
      `${DbClient.UNICODE_DB}/${DbClient.BLOCKS_COLLECTION}`,
    )
    await this.createIndex(blocks, `${DbClient.UNICODE_DB}/${DbClient.BLOCKS_COLLECTION}/index`, {
      index: 1,
    })
    await this.createIndex(blocks, `${DbClient.UNICODE_DB}/${DbClient.BLOCKS_COLLECTION}/key`, {
      key: 1,
    })
  }

  public exitProcess() {
    ora(oraOpts(`[${DbClient.UNICODE_DB}] created successfully - happy days ಠ益ಠ`)).succeed()
    process.exit()
  }

  private async connect() {
    if (this.db) {
      return
    }
    try {
      const client = await this.createConnection()
      await this.connectDb(client)
    } catch (e) {
      console.log("Unable to connect to db", e)
    }
  }

  private async createConnection(): Promise<MongoClient> {
    const spinner = ora(`Connecting to server [${process.env.MONGO_URL}]`).start()
    const client = await MongoClient.connect(
      process.env.MONGO_URL || "mongodb://localhost:27017/",
      {useNewUrlParser: true},
    )
    spinner.succeed()
    return client
  }

  private async connectDb(client: MongoClient) {
    const spinner = ora(`Connecting to db [${DbClient.UNICODE_DB}]`).start()
    this.db = await client.db(DbClient.UNICODE_DB)
    spinner.succeed()
  }

  private async dropCollection(unicodepoints: Collection, name: string) {
    const spinner = ora(oraOpts(`Dropping collection [${name}]`)).start()
    try {
      await unicodepoints.drop()
    } catch (collectionExistsException) {
      // noop
    }
    spinner.succeed()
  }

  private async populateCollection(documents: object[], unicodepoints: Collection, name: string) {
    const spinner = ora(oraOpts(`Creating collection [${name}]`)).start()
    await unicodepoints.insertMany(documents)
    spinner.succeed()
  }

  private async createIndex(collection: Collection, name: string, index: object) {
    const spinner = ora(oraOpts(`Creating index for [${name}]`)).start()
    await collection.createIndex(index)
    spinner.succeed()
  }
}
