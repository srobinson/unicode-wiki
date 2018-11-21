import {DELIMINATOR} from "./ReadLineParser"

/**
 * Config definition for parsing text files
 */
export type FileParserConfig = {
  /**
   * Deliminator type to split a line of text
   */
  DELIMINATOR?: DELIMINATOR

  /**
   * End parsing @ line number
   * [-1] will parse to EOF
   */
  END_LINE?: number

  /**
   * Path to a file on disk to be parsed (required)
   */
  PATH: string

  /**
   * Begin parsing @ line number
   */
  START_LINE?: number

  /**
   * Output parser logging info
   * Useful for debugging
   */
  VERBOSE?: boolean
}
