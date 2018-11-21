import * as fs from "fs"
import * as rl from "readline"
import * as ora from "ora"
import Dictionary from "./Dictionary"
import {FileParserConfig} from "./FileParserConfig"
import LineParser from "./LineParser"
import {oraOpts} from "@uw/logging"
/**
 * This class must be initialized with a @see FileParserConfig
 * and a dictionary @see Dictionary used for storing results
 * of line transformation
 *
 * ReadLineParser contains a single public method <code>parse</code>
 * which opens a read stream and parses each line based on a @see LineParser
 * implementation
 */
export default class ReadLineParser<K, V> {
  /**
   * Default configuration
   * PATH is a required field, left empty here but checked in constructor
   */
  CONFIG: FileParserConfig = {
    DELIMINATOR: DELIMINATOR.TAB,
    END_LINE: -1,
    PATH: "",
    START_LINE: 1,
    VERBOSE: false,
  }

  /**
   * Stores results of transforming file
   */
  private dictionary: Dictionary<K, V>

  /**
   * Keeps a count of the number of lines parsed
   */
  private parsedLineCount: number = 0

  constructor(config: FileParserConfig, dictionary: Dictionary<K, V>) {
    if (!config.PATH.length) {
      throw Error(`No path key found in config @see FileParserConfig: ${config}`)
    }
    Object.assign(this.CONFIG, {...config})
    this.dictionary = dictionary
  }

  /**
   * Creates an instance of a realLine.ReadLine
   * and transforms lines of the file to parse
   *
   * @param lineParser a LineParser implementation
   * @param cb optional callback, returns dictionary once all lines parsed
   */
  parse(lineParser: LineParser<K, V>, cb?: Function) {
    const reader = rl.createInterface(fs.createReadStream(this.CONFIG.PATH))
    const spinner = ora(oraOpts(`Loading ${this.CONFIG.PATH}`)).start()
    reader.on("line", line => {
      if (this.shouldParse()) {
        this.readLine(line, lineParser)
      }
      this.parsedLineCount++
    })

    reader.on("close", () => {
      spinner.succeed()
      return cb && cb(undefined, this.dictionary, lineParser)
    })
  }

  /**
   * Transforms string using a @see LineParser and creates entries
   * in @see Dictionary
   * @param line string to be parsed
   * @param lineParser lineParser used to transform
   */
  private readLine(line: string, lineParser: LineParser<K, V>) {
    const cols: string[] = line.split(this.CONFIG.DELIMINATOR || DELIMINATOR.NONE)
    lineParser.parse(cols, this.dictionary)
    if (this.CONFIG.VERBOSE) {
      const log = cols.map((col, i) => `[${i}]: ${col}`).join(" | ")
      console.log(`[${this.parsedLineCount}]`, log)
    }
  }

  /**
   * Determins whether the current line should be parsed by the lineParser
   * @return true if current within START_LINE/END_LINE range
   */
  private shouldParse(): boolean {
    return (
      this.parsedLineCount >= (this.CONFIG.START_LINE || 1) - 1 &&
      (this.CONFIG.END_LINE === -1 || this.parsedLineCount <= (this.CONFIG.END_LINE || -1))
    )
  }
}

/**
 * Supported line parsing deliminators
 */
export enum DELIMINATOR {
  NONE = "\r",
  SEMI = ";",
  SPACE = " ",
  TAB = "\t",
}
