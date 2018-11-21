import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import ExpandedValue from "./domain/ExpandedValue"

export default class BlocksLineParser<K extends string, V extends ExpandedValue> implements LineParser<K, V> {
  parse(cols: string[], dictionary: Dictionary<string, ExpandedValue>): void {
    // skip over comments and empty lines
    if (/^#|^$/.test(cols[0]) === false) {
      const key = cols[0].trim()
      const name = cols[1].trim().replace(/_/g, " ")
      const entry = new ExpandedValue(key, name, "")
      dictionary.put(entry.key, entry)
    }
  }
}
