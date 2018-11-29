import Dictionary from "../file-parser/Dictionary"
import LineParser from "../file-parser/LineParser"
import CodePoint from "./domain/CodePoint"
import {codepointIndexRange} from "@uw/utils"

export default class EmojiLineParser<K, V extends CodePoint> implements LineParser<K, V> {
  private emojiCodePoints: number[] = []

  parse(cols: string[], dictionary: Dictionary<K, V>) {
    if (/^#|^$/.test(cols[0])) {
      return
    }
    const range = cols[0].trim()
    let {from, to} = codepointIndexRange(range)
    for (let i = from; i <= (to || from); i++) {
      this.emojiCodePoints.push(i)
    }
  }

  update(dictionary: Dictionary<K, CodePoint>) {
    dictionary
      .getValues()
      .filter(entry => this.emojiCodePoints.indexOf(entry.index) > -1)
      .forEach(entry => (entry.emoji = true))
  }
}
