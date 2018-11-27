import * as mongoose from "mongoose"
import {jsonifyError, InternalException} from "@uw/domain"
import {logger} from "@uw/logging"
import {sleep} from "@uw/utils"
import "../../config"
import {jsonifyError} from "@uw/domain"

export const DB_URL = `${process.env.MONGO_URL}/unicode-wiki`

export class MongoDb {
  public static reconnectInterval: number = 2000
  public static reconnectTries: number = 60
  public static retries: number = 0

  public static connect = async () => {
    if (!MongoDb.connection) {
      try {
        await mongoose.connect(
          DB_URL,
          {useNewUrlParser: true},
        )
        const connection = mongoose.connection
        connection.on("open", () => logger.info(`===>  Connected to ${DB_URL}`))
        connection.on("error", (e: Error) => logger.error(jsonifyError))
        MongoDb.connection = connection
      } catch (e) {
        logger.error(jsonifyError(e))
        process.exit()
      }
    }
  }
}
