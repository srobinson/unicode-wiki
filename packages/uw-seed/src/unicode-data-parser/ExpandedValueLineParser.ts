import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import ExpandedValue from "./domain/ExpandedValue"

export default class ExpandedValueLineParser<K extends string, V extends ExpandedValue> implements LineParser<K, V> {
  private entry: ExpandedValue = this.initEntry()
  private cursor: number = 0

  parse(cols: string[], dictionary: Dictionary<string, ExpandedValue>) {
    const col1 = cols[0]
    if (col1.length > 0 && col1.length <= 3) {
      Object.assign(this.entry, {key: col1})
      this.cursor++
    } else if (this.cursor === 1) {
      Object.assign(this.entry, {value: col1})
      this.cursor++
    } else if (this.cursor === 2) {
      const entry: ExpandedValue = Object.assign({}, this.entry, {
        description: col1,
      })
      dictionary.put(entry.key, entry)
      this.initEntry()
      this.cursor = 0
    }
  }

  private initEntry(): ExpandedValue {
    return new ExpandedValue("", "", "")
  }
}
