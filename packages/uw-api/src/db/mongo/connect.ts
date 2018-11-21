import * as mongoose from "mongoose"
import {logger} from "@uw/logging"
import "../../config"

export const DB_URL = `${process.env.MONGO_URL}/unicode-wiki`

export class MongoDb {
  public static connection: mongoose.Connection

  public static connect = async () => {
    if (!MongoDb.connection) {
      try {
        await mongoose.connect(
          DB_URL,
          {useNewUrlParser: true},
        )
        const connection = mongoose.connection
        connection.on("open", () => logger.info(`===>  Connected to ${DB_URL}`))
        connection.on("error", (e: Error) => logger.error(DB_URL, e))
        MongoDb.connection = connection
      } catch (e) {
        console.log("error connecting...", e)
        console.log("DB_URL...", DB_URL)
        process.exit()
      }
    }
  }
}
