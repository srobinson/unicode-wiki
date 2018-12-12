import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import CodePoint from "./domain/CodePoint"

export default class EmojiLineParser<K extends string, V extends CodePoint>
  implements LineParser<K, V> {
  private emojiHeader: string = ""
  private emojiSubHeader: string = ""

  parse(cols: string[], dictionary: Dictionary<string, CodePoint>) {
    const row = cols[0]
    if (/<tr><th class="bighead"><a href="#([a-z_&amp;]+)/.test(row)) {
      // @ts-ignore
      const emojiHeader = row.match(/<tr><th class="bighead"><a href="#([a-z_&amp;]+)/)[1]
      this.emojiHeader = emojiHeader.replace(/_&amp;_/, " ")
    }
    if (/name=\"([a-z-_&amp;]+)/.test(row)) {
      // @ts-ignore
      const emojiHeader = row.match(/name=\"([a-z-_&amp;]+)/)[1]
      this.emojiSubHeader = emojiHeader.replace(/-/g, " ")
    }
    if (/href="emoji-list\.html#([0-9a-f\s_]+)"/.test(row)) {
      // @ts-ignore
      const match = row.match(/href="emoji-list\.html#([0-9a-f\s_]+)"/)[1]
      const codepoints = match.split(/_|\s/)
      codepoints.forEach((cp: string) => {
        const entry: CodePoint = dictionary.get(cp.toUpperCase())
        if (entry) {
          entry.emoji = true
          entry.emoji_header = this.emojiHeader
          entry.emoji_subheader = this.emojiSubHeader
        } else {
          console.log("not-dound", cp)
        }
      })
    }
  }
}
