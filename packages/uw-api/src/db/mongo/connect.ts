import * as mongoose from "mongoose"
import {jsonifyError, InternalException} from "@uw/domain"
import {logger} from "@uw/logging"
import {sleep} from "@uw/utils"
import "../../config"

export const DB_URL = `${process.env.MONGO_URL}/unicode-wiki`

export class MongoDb {
  public static reconnectInterval: number = 2000
  public static reconnectTries: number = 60
  public static retries: number = 0

  // tslint:disable:no-any
  public static connect = async (): Promise<any> => {
    return mongoose
      .connect(
        DB_URL,
        {
          useNewUrlParser: true,
        },
      )
      .then(db => {
        logger.info(`===>  Connected! to ${DB_URL}`)
        const connection = db.connection
        connection.on("error", (e: Error) => logger.error(jsonifyError(e)))
        return db
      })
      .catch((e: Error) => {
        if (MongoDb.retries < MongoDb.reconnectTries) {
          logger.error(
            Object.assign(jsonifyError(e), {
              retry: `Retry attempt [${++MongoDb.retries}/${
                MongoDb.reconnectTries
              }] in ${MongoDb.reconnectInterval / 1000}s`,
            }),
          )
          sleep(MongoDb.reconnectInterval)
          logger.info(`Connecting to ${DB_URL}`)
          return MongoDb.connect()
        } else {
          throw new InternalException(
            new Error(`Could not connect to Mongo after ${MongoDb.retries} retries`),
          )
        }
      })
  }
}
