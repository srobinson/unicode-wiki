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
export const codepointIndexRangeQuery = (range: string): {index: {$gte: number; $lte?: number}} => {
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
 *      $gte:0, $gte: 5
 *    },
 *    index: {
 *      $gte:10, $gte: 11
 *    },
 *  ]
 * }
 *
 * @param ranges ranges to map of
 * @return the generates query
 */
export const codepointIndexRangeOrQuery = (ranges: string[]) => {
  const codepointIndexRanges = ranges.map((range: string) => codepointIndexRangeQuery(range))
  return {$or: codepointIndexRanges}
}
