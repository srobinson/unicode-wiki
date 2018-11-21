import * as fs from "fs"
import {InternalException} from "@uw/domain"

/**
 * Simple utility for loading/pasing JSON files
 *
 * @param path the location of the JSON file
 */
export const loadJSONFile = (path: string) => {
  try {
    return JSON.parse(fs.readFileSync(path, "utf8"))
  } catch (e) {
    throw new InternalException(e)
  }
}
