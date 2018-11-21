import * as async from "async"
import * as path from "path"
import {CodePointDict, ExpandedValueDict} from "./file-parser/Dictionary"
import LocalDictionary from "./file-parser/LocalDictionary"
import LineByLineFileParser, {DELIMINATOR} from "./file-parser/ReadLineParser"
import DbClient from "./mongo"
import BlocksLineParser from "./unicode-data-parser/BlocksLineParser"
import CodePoint from "./unicode-data-parser/domain/CodePoint"
import EmojiLineParser from "./unicode-data-parser/EmojiLineParser"
import ExpandedValueLineParser from "./unicode-data-parser/ExpandedValueLineParser"
import NamesListLineParser from "./unicode-data-parser/NamesListLineParser"
import PropertyAliasesLineParser from "./unicode-data-parser/PropertyAliasesLineParser"
import PropertyAliasesValuesLineParser from "./unicode-data-parser/PropertyAliasesValuesLineParser"
import UCDXMLParser from "./unicode-data-parser/UCDXMLParser"

const generalCategoryDict: ExpandedValueDict = new LocalDictionary()
const propertyAliasesDict: ExpandedValueDict = new LocalDictionary()
const propertyAliasesValuesDict: ExpandedValueDict = new LocalDictionary()
const bidiDict: ExpandedValueDict = new LocalDictionary()
const blocksDict: ExpandedValueDict = new LocalDictionary()
const codePointDict: CodePointDict = new LocalDictionary()

export const UCDpath = path.join(__dirname, "../UCD/")

class Runner {
  public static main() {
    const client = new DbClient()

    async.series([
      function parsePropertyAliasesFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: path.join(UCDpath, "property-aliases"),
          },
          propertyAliasesDict,
        ).parse(new PropertyAliasesLineParser(), cb)
      },
      function parsePropertyAliasesValuesFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: path.join(UCDpath, "property-aliases-values"),
            START_LINE: 56,
          },
          propertyAliasesValuesDict,
        ).parse(new PropertyAliasesValuesLineParser(), cb)
      },
      function parseGeneralCategoryFile(cb) {
        new LineByLineFileParser(
          {
            PATH: path.join(UCDpath, "general-categories"),
          },
          generalCategoryDict,
        ).parse(new ExpandedValueLineParser(), cb)
      },
      function parseBidiFile(cb) {
        new LineByLineFileParser(
          {
            PATH: path.join(UCDpath, "bidi-class"),
          },
          bidiDict,
        ).parse(new ExpandedValueLineParser(), cb)
      },

      function parseBlocks(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: path.join(UCDpath, "blocks"),
          },
          blocksDict,
        ).parse(new BlocksLineParser(), cb)
      },

      function parseUCDXML(cb) {
        new UCDXMLParser(propertyAliasesDict, propertyAliasesValuesDict, codePointDict).parse(cb)
      },

      function parseNamesList(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.TAB,
            PATH: path.join(UCDpath, "names-list"),
            START_LINE: 13,
          },
          codePointDict,
        ).parse(new NamesListLineParser(), cb)
      },

      function parseEmoji(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: path.join(UCDpath, "emoji"),
            START_LINE: 25,
          },
          codePointDict,
        ).parse(
          new EmojiLineParser(),
          (
            err: string,
            dictionary: CodePointDict,
            lineParser: EmojiLineParser<string, CodePoint>,
          ) => {
            lineParser.update(dictionary)
            cb()
          },
        )
      },
      async function() {
        await client.createCategories(blocksDict)
        await client.createCollection(codePointDict)
        await client.exitProcess()
      },
    ])
  }
}

Runner.main()
