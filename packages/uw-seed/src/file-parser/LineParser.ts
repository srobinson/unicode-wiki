import Dictionary from "./Dictionary"

/**
 * The LineParser provides a single method for parsing
 * an array of strings and transforming them into
 * dictionary entries
 */
export default interface LineParser<K, V> {
  parse(cols: string[], dictionary: Dictionary<K, V>): void
}
