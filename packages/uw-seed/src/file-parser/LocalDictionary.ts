import Dictionary, {DictionaryEntry} from "./Dictionary"

export default class LocalDictionary<K extends string, V extends DictionaryEntry> implements Dictionary<K, V> {
  private internalDict: Partial<Record<K, V>> = {}

  public getKeys(): K[] {
    let keys: K[] = []
    for (let key in this.internalDict) {
      keys.push(key)
    }

    return keys
  }
  public getValues(): V[] {
    let vals: V[] = []

    for (let key in this.internalDict) {
      vals.push(<V>this.internalDict[key])
    }

    return vals
  }

  public get(key: K): V {
    return <V>this.internalDict[key]
  }

  public put(key: K, val: V): V {
    this.internalDict[key] = val
    return val
  }
}
