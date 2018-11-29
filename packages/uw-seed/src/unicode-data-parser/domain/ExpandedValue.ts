// tslint:disable:member-ordering
import {DictionaryEntry} from "../../file-parser/Dictionary"

/**
 * General POJO used for expanding abbreviated Unicode nomenclature
 */
export default class ExpandedValue extends DictionaryEntry {
  constructor(public key: string, public name: string, public value: string) {
    super()
  }
}
