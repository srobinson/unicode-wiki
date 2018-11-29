// tslint:disable:member-ordering
import {DictionaryEntry} from "../../file-parser/Dictionary"
import {Category} from "@uw/domain"

/**
 * General POJO used for expanding abbreviated Unicode nomenclature
 */
export default class CategoryEntry extends DictionaryEntry {
  constructor(public category: Category) {
    super()
  }
}
