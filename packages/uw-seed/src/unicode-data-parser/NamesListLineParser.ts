import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import CodePoint from "./domain/CodePoint"
import {isHex} from "@uw/utils"

export default class NamesListLineParser<K extends string, V extends CodePoint>
  implements LineParser<K, V> {
  private entry: CodePoint = new CodePoint("-1", -1)
  private block_header: string = ""
  private block_subheader: string = ""

  public parse(cols: string[], dictionary: Dictionary<string, CodePoint>) {
    const [col1, col2, col3] = cols

    if (col1 === "@@") {
      this.block_header = col3
    } else if (col1 === "@") {
      this.block_subheader = col3
    } else if (isHex(col1)) {
      // in the case of reserved code points,
      // dictionary will return null entry
      this.entry = dictionary.get(col1)
      if (!this.entry) {
        this.entry = new CodePoint("RESERVERD", -1)
      }
      this.entry.block_header = this.block_header
      this.entry.block_subheader = this.block_subheader
    } else if (col2 && col2.startsWith("*")) {
      this.entry.comments.push(col2)
    } else if (col2 && col2.startsWith("x")) {
      this.entry.cross_ref.push(col2)
    } else if (col2 && col2.startsWith(":")) {
      this.entry.decomposition.push(col2)
    }
  }
}
