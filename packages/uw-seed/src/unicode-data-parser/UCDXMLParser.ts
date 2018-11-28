// tslint:disable
import * as fs from "fs"
import * as xml2js from "xml2js"
import * as ora from "ora"
import CodePoint from "./domain/CodePoint"
import ExpandedValue from "./domain/ExpandedValue"
import LocalDictionary from "../file-parser/LocalDictionary"
import {CodePointDict, ExpandedValueDict} from "../file-parser/Dictionary"
import {oraOpts} from "@uw/logging"
import {getUTCPath} from "../utils"

// http://unicode.org/reports/tr42/
// https://www.unicode.org/Public/UCD/latest/ucd/PropertyAliases.txt
//
//
//

export default class UCDXMLParser {
  static all = getUTCPath("ucd.all.flat.xml")
  static unihan = getUTCPath("ucd.unihan.flat.xml")
  static allgrouped = getUTCPath("ucd.all.grouped.xml")

  static ignoredAttrubutes = ["", "#", "0", "none", "nan", "no", "na"]

  private propertyAliasesDict: ExpandedValueDict
  private propertyAliasesValuesDict: ExpandedValueDict
  private codePointDict: CodePointDict

  private currentFont: string = ""

  constructor(
    propertyAliasesDict: ExpandedValueDict,
    propertyAliasesValuesDict: ExpandedValueDict,
    codePointDict: CodePointDict,
  ) {
    this.propertyAliasesDict = propertyAliasesDict
    this.propertyAliasesValuesDict = propertyAliasesValuesDict
    this.codePointDict = codePointDict
  }

  async parse(cb: Function) {
    const spinner = ora(oraOpts(`Loading ${UCDXMLParser.allgrouped}`)).start()
    fs.readFile(UCDXMLParser.allgrouped, async (err, data) => {
      if (err) {
        throw new Error(err.stack)
      }
      spinner.succeed()
      await this.processGroups(data, cb)
    })
  }

  private async processGroups(data: Buffer, cb: Function) {
    const spinner = ora(oraOpts(`Parsing ${UCDXMLParser.allgrouped}`)).start()
    const parser = new xml2js.Parser()
    await parser.parseString(data, async (err: any, result: any) => {
      if (err) {
        throw new Error(err.stack)
      }
      const groups = result.ucd["repertoire"][0].group
      groups.forEach((group: any) => {
        if (group["$"]) {
          const groupDict = this.processAttributes(group["$"])
          group.char &&
            group.char.forEach((char: any) => {
              const charDict = this.processAttributes(char["$"])
              const merged: ExpandedValueDict = this.mergeDicts(groupDict, charDict)
              const codePoint = this.processCodePoint(merged)
              if (codePoint) {
                this.processNameAlias(codePoint, char["name-alias"])
              }
            })
        }
      })
      spinner.succeed()

      return cb(null, this.codePointDict)
    })
  }

  private mergeDicts(groupDict: ExpandedValueDict, charDict: ExpandedValueDict): ExpandedValueDict {
    const merged: ExpandedValueDict = new LocalDictionary()
    groupDict.getKeys().forEach(key => {
      merged.put(key, groupDict.get(key))
    })
    charDict.getKeys().forEach(key => {
      merged.put(key, charDict.get(key))
    })
    return merged
  }

  processAttributes(node: any): ExpandedValueDict {
    const dictionary: ExpandedValueDict = new LocalDictionary()
    Object.entries(node).forEach(record => {
      const nameEntry = this.propertyAliasesDict.get(record[0])
      const valueEntry = this.propertyAliasesValuesDict.get(`${record[0]}-${record[1]}`)
      const name = (nameEntry && nameEntry.name) || record[0]
      const value = (valueEntry && valueEntry.value) || <string>record[1]
      if (value && UCDXMLParser.ignoredAttrubutes.indexOf(value.toLowerCase()) === -1) {
        dictionary.put(record[0], new ExpandedValue(record[0], name, value))
      }
    })
    return dictionary
  }

  processCodePoint(dictionary: ExpandedValueDict): CodePoint | null {
    const propertyFields: ExpandedValue[] = <ExpandedValue[]>dictionary.getValues()
    const block: ExpandedValue = <ExpandedValue>dictionary.get("blk")
    if (!(dictionary.get("cp") && dictionary.get("cp").value)) {
      return null
    }
    const cp: string = dictionary.get("cp").value
    const font = this.className(cp)
    if (font) {
      this.currentFont = font
    }
    const general_category: ExpandedValue = <ExpandedValue>dictionary.get("gc")
    const name: string = (dictionary.get("na") && dictionary.get("na").value) || ""
    const name_v1: string = (dictionary.get("na1") && dictionary.get("na1").value) || ""
    const script: ExpandedValue = <ExpandedValue>dictionary.get("sc")
    const codePoint = new CodePoint(cp, parseInt(cp, 16))
    codePoint.patch({
      block,
      font: this.currentFont,
      general_category,
      key: cp,
      [name && "name"]: name,
      [name_v1 && "name_v1"]: name_v1,
      properties: this.sortProperties(propertyFields),
      script,
    })
    this.codePointDict.put(cp, codePoint)
    return codePoint
  }

  processNameAlias(codePoint: CodePoint, alias?: any) {
    if (alias) {
      alias = alias[0]["$"]
      codePoint.name_alias.push(alias)
    }
  }

  sortProperties(properties: ExpandedValue[]): ExpandedValue[] {
    return properties.sort((a, b) => {
      if (a.name > b.name) return 1
      if (a.name < b.name) return -1
      return 0
    })
  }

  private className(code: string): string | undefined {
    const length = code.length
    const token = code[code.length - 3]
    if (
      (token === "0" || token === "4" || token === "8" || token === "C") &&
      code[code.length - 2] === "0"
    ) {
      return ("u" + code.substr(0, length - 3) + token + "00").toLowerCase()
    }
    return undefined
  }
}

// { ucd:
//    { '$': { xmlns: 'http://www.unicode.org/ns/2003/ucd/1.0' },
//      description: [ 'Unicode 5.2.0' ],
//      repertoire: [ [Object] ],
//      blocks: [ [Object] ],
//      'named-sequences': [ [Object] ],
//      'provisional-named-sequences': [ [Object] ],
//      'normalization-corrections': [ [Object] ],
//      'standardized-variants': [ [Object] ],
//      'cjk-radicals': [ [Object] ] } }
//
