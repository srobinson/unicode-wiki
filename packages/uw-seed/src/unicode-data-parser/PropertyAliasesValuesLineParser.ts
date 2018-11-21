import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import ExpandedValue from "./domain/ExpandedValue"

export default class PropertyAliasesValuesLineParser<K extends string, V extends ExpandedValue>
  implements LineParser<K, V> {
  parse(cols: string[], dictionary: Dictionary<string, ExpandedValue>): void {
    // test for
    if (/^#|^$/.test(cols[0]) === false) {
      const name = cols[0].trim()
      // Canonical_Combining_Class (ccc) are treated as a special case
      // @see https://www.unicode.org/Public/UCD/latest/ucd/PropertyValueAliases.txt
      let colIndex = name === "ccc" ? 2 : 1
      const key = cols[colIndex].trim()
      const value = cols[++colIndex].trim().replace(/_/g, " ")
      const entry = new ExpandedValue(`${name}-${key}`, name, value)
      dictionary.put(entry.key, entry)
    }
  }
}
