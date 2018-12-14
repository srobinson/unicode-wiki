import {CodepointIndexRangeQuery, CodepointIndexRangeOrQuery} from "@uw/domain"
import {codepointIndexRange} from "./unicode-utils"

/**
 * Generates a hex range query
 *
 * Example:
 *
 * "0000:0005" => {
 *  index: {
 *    $gte: 0, $lte: 5
 *  }
 * }
 * @param range the range to transform
 * @return the generated query
 */
export const codepointIndexRangeQuery = (range: string): CodepointIndexRangeQuery => {
  const {from, to} = codepointIndexRange(range)
  const q = {$gte: from}
  if (to !== from) {
    Object.assign(q, {$lte: to})
  }
  return {index: q}
}

/**
 * Generates a list of hex range queries
 *
 * Example:
 *
 * ["0000:0005", "000A:000B"] => {
 *  $or: [
 *    index: {
 *      $gte:0, $lte: 5
 *    },
 *    index: {
 *      $gte:10, $lte: 11
 *    },
 *  ]
 * }
 *
 * @param ranges ranges to map of
 * @return the generates query
 */

export const codepointIndexRangeOrQuery = (ranges: string[]): CodepointIndexRangeOrQuery => {
  const codepointIndexRanges: CodepointIndexRangeQuery[] = ranges.map((range: string) =>
    codepointIndexRangeQuery(range),
  )
  return {$or: codepointIndexRanges}
}
