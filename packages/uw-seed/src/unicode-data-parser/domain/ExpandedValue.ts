// tslint:disable:member-ordering
import {DictionaryEntry} from "../../file-parser/Dictionary"

/**
 * General POJO used for expanding abbreviated Unicode nomenclature
 */
export default class ExpandedValue extends DictionaryEntry {
  constructor(key: string, name: string, value: string) {
    super()
    this.key = key
    this.name = name
    this.value = value
  }
  key: string
  name: string
  value: string
}
