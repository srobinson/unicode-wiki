import * as async from "async"
import {CodePointDict, ExpandedValueDict, CategoryEntryDict} from "./file-parser/Dictionary"
import LocalDictionary from "./file-parser/LocalDictionary"
import LineByLineFileParser, {DELIMINATOR} from "./file-parser/ReadLineParser"
import DbClient from "./mongo"
import BlocksLineParser from "./unicode-data-parser/BlocksLineParser"
import CategoryLineParser from "./unicode-data-parser/CategoryLineParser"
import EmojiLineParser from "./unicode-data-parser/EmojiLineParser"
import ExpandedValueLineParser from "./unicode-data-parser/ExpandedValueLineParser"
import NamesListLineParser from "./unicode-data-parser/NamesListLineParser"
import PropertyAliasesLineParser from "./unicode-data-parser/PropertyAliasesLineParser"
import PropertyAliasesValuesLineParser from "./unicode-data-parser/PropertyAliasesValuesLineParser"
import UCDXMLParser from "./unicode-data-parser/UCDXMLParser"
import {getUTCPath, updateCategoriesWithHasChildrenFlag, generateSuggest} from "./utils"
import EsClient from "./elastic"

const generalCategoryDict: ExpandedValueDict = new LocalDictionary()
const propertyAliasesDict: ExpandedValueDict = new LocalDictionary()
const propertyAliasesValuesDict: ExpandedValueDict = new LocalDictionary()
const bidiDict: ExpandedValueDict = new LocalDictionary()
const blocksDict: ExpandedValueDict = new LocalDictionary()
const codePointDict: CodePointDict = new LocalDictionary()
const scriptsEntryDict: CategoryEntryDict = new LocalDictionary()
const symbolsEntryDict: CategoryEntryDict = new LocalDictionary()

class Runner {
  public static async main() {
    const client = new DbClient()
    const esClient = new EsClient()

    if (await client.isSeeded()) {
      process.exit()
    }

    async.series([
      function parseScriptsFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: getUTCPath("chart-scripts"),
          },
          scriptsEntryDict,
        ).parse(new CategoryLineParser(), cb)
      },
      function parseScriptsFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: getUTCPath("chart-symbols"),
          },
          symbolsEntryDict,
        ).parse(new CategoryLineParser(), cb)
      },
      function parsePropertyAliasesFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: getUTCPath("property-aliases"),
          },
          propertyAliasesDict,
        ).parse(new PropertyAliasesLineParser(), cb)
      },
      function parsePropertyAliasesValuesFile(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: getUTCPath("property-aliases-values"),
            START_LINE: 56,
          },
          propertyAliasesValuesDict,
        ).parse(new PropertyAliasesValuesLineParser(), cb)
      },
      function parseGeneralCategoryFile(cb) {
        new LineByLineFileParser(
          {
            PATH: getUTCPath("general-categories"),
          },
          generalCategoryDict,
        ).parse(new ExpandedValueLineParser(), cb)
      },
      function parseBidiFile(cb) {
        new LineByLineFileParser(
          {
            PATH: getUTCPath("bidi-class"),
          },
          bidiDict,
        ).parse(new ExpandedValueLineParser(), cb)
      },

      function parseBlocks(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.SEMI,
            PATH: getUTCPath("blocks"),
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
            PATH: getUTCPath("names-list"),
            START_LINE: 13,
          },
          codePointDict,
        ).parse(new NamesListLineParser(), cb)
      },

      function parseEmoji(cb) {
        new LineByLineFileParser(
          {
            DELIMINATOR: DELIMINATOR.NONE,
            PATH: getUTCPath("emoji-html"),
            // VERBOSE: true,
          },
          codePointDict,
        ).parse(new EmojiLineParser(), cb)
      },
      function generateSuggestions(cb) {
        codePointDict.getValues().forEach(codepoint => {
          codepoint["suggest"] = generateSuggest(codepoint)
        })
        cb()
      },

      async function() {
        await client.createCategories(blocksDict)
        await client.createCollection(codePointDict)
        await esClient.bulkInsert()
        await client.exitProcess()
      },
    ])
  }
}

Runner.main()
