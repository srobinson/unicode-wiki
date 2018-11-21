// tslint:disable:member-ordering
import ExpandedValue from "./ExpandedValue"
import {DictionaryEntry} from "../../file-parser/Dictionary"
import {Codepoint} from "@uw/domain"

/**
 * POJO for storing Unicode CodePoint info
 */
export default class CodePoint extends DictionaryEntry implements Codepoint {
  constructor(cp: string, index: number) {
    super()
    this.cp = cp
    this.index = index
  }

  index: number

  // https://www.unicode.org/Public/UCD/latest/ucd/NamesList.html
  // ./uw-seed/UCD/names-list
  cp: string

  name?: string
  name_v1?: string
  name_alias: object[] = [] // =

  block_header?: string // @@ (check next character is a tab)
  block_subheader?: string // @ (check next character is a tab)

  // https://www.unicode.org/Public/UCD/latest/ucd/Blocks.txt
  // ./uw-seed/UCD/blocks
  block?: ExpandedValue

  // https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
  // ftp://unicode.org/Public/3.2-Update/UnicodeData-3.2.0.html
  // ./uw-seed/UCD/general-categories
  general_category?: ExpandedValue

  // https://www.unicode.org/Public/UCD/latest/ucd/scripts.txt
  // ./uw-seed/UCD/scripts
  script?: ExpandedValue

  cross_ref: string[] = [] // x
  decomposition: string[] = [] // :
  properties: ExpandedValue[] = []

  // https://www.unicode.org/Public/UCD/latest/ucd/NamesList.html
  // ./uw-seed/UCD/names-list
  // https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip
  // ./uw-seed/UCD/unihan-numeric-values
  // https://www.unicode.org/Public/UCD/latest/ucd/Unihan.zip
  // ./uw-seed/UCD/unihan-readings #kDefinition
  comments: string[] = [] // *

  // https://www.unicode.org/Public/UCD/latest/ucd/UnicodeData.txt
  // ftp://unicode.org/Public/3.2-Update/UnicodeData-3.2.0.html
  // ./uw-seed/UCD/bidi-class
  // bidi_class: ExpandedValue

  // ftp://unicode.org/Public/emoji/11.0/emoji-data.txt
  // ./uw-seed/UCD/emoji
  emoji?: boolean
}
