import CodePoint from "../unicode-data-parser/domain/CodePoint"
import ExpandedValue from "../unicode-data-parser/domain/ExpandedValue"
import CategoryEntry from "../unicode-data-parser/domain/CategoryEntry"

/**
 * The Dictionary interface provides
 * convenient methods for storing key/value pairs
 */
export default interface Dictionary<K, V> {
  getKeys(): K[]
  getValues(): V[]
  get(key: K): V
  put(key: K, val: V): V
}

export type CodePointDict = Dictionary<string, CodePoint>
export type ExpandedValueDict = Dictionary<string, ExpandedValue>
export type CategoryEntryDict = Dictionary<string, CategoryEntry>
export type StringDict = Dictionary<string, string>

export abstract class DictionaryEntry {
  patch(partial: object): DictionaryEntry {
    return Object.assign(this, {...partial})
  }
}
