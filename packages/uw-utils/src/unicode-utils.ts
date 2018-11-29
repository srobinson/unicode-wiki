import {CodepointIndexRange, CodepointHexRange} from "@uw/domain"

// Regex matches hex format [0000-FFFFFF]
export const HEX_RE = /^([0-9a-fA-F]){4,6}$/

/**
 * Validates an input string as hex format
 *
 * @param input the string to test
 * @return boolean
 */
export const isHex = (input: string): boolean => {
  return HEX_RE.test(input)
}

/**
 * Transforms an int into hex format
 *
 * @param int the int to transform
 */
export const intToHex = (int: number) => {
  const hex = int.toString(16).toUpperCase()
  return int < 65535 ? ("0000" + hex).slice(-4) : hex
}

/**
 * Trasnforms a delimited string of hex pairs
 * into a range of hexs'
 *
 * @see CodepointHexRange
 *
 * Example:
 *
 * "0000:0005" => {
 *  from: "0000",
 *  to: "0005",
 * }
 *
 * "0000..0005" => {
 *  from: "0000",
 *  to: "0005",
 * }
 *
 * "0000-0005" => {
 *  from: "0000",
 *  to: "0005",
 * }
 *
 * "0000" => {
 *  from: "0000",
 *  to: "0000",
 * }
 *
 * @param input the string to transform
 * @return the transformed input @see CodepointHexRange
 */
export const codepointHexRange = (input: string): CodepointHexRange => {
  // support string will be delimination by ".." or "-"
  input = input.replace(/\.\.|\-/, ":")
  const parts = input.split(":")
  if (!isHex(parts[0])) {
    throw new Error(`1: ${parts[0]} not a valid range`)
  }
  if (parts[1] && !isHex(parts[1])) {
    throw new Error(`2: ${parts[1]} not a valid range`)
  }
  return {from: parts[0], to: parts[1] || parts[0]}
}

/**
 * Trasnforms a delimited string of hex pairs
 * into a range of integers
 *
 * @see CodepointIndexRange
 *
 * Example:
 *
 * "0000:0005" => {
 *  from: 0,
 *  to: 5,
 * }
 *
 * "0000..0005" => {
 *  from: 0,
 *  to: 5,
 * }
 *
 * "0000-0005" => {
 *  from: 0,
 *  to: 5,
 * }
 *
 * "0000-0005" => {
 *  from: 0,
 *  to: 5,
 * }
 *
 * @param input the string to transform
 * @return the transformed input @see CodepointIndexRange
 */
export const codepointIndexRange = (input: string): CodepointIndexRange => {
  const {from, to} = codepointHexRange(input)
  return to
    ? {
        from: parseInt(from, 16),
        to: parseInt(to, 16),
      }
    : {
        from: parseInt(from, 16),
        to: parseInt(from, 16),
      }
}

/**
 * Generates a string of length N consisting of the N specified UTF-16 code units
 *
 * Example:
 *
 * "00AB" => «
 * "00D8" => Ø
 * "F65001" => ᕔ�
 *
 * @param input the character code/hex to transform
 * @return the generated code units
 */
export const fromCharCode = (input: string) => {
  if (!isHex(input)) {
    throw Error(`${input} is not a valid hex character`)
  }
  let inputInt = parseInt(input, 16)
  if (inputInt > 0xffff) {
    inputInt -= 0x10000
    return String.fromCharCode(0xd800 + (inputInt >> 10), 0xdc00 + (inputInt & 0x3ff))
  } else {
    return String.fromCharCode(inputInt)
  }
}

/**
 * Generates a class name for a given unicode point
 *
 * Example:
 *
 * "00AB" => "u0000"
 * "1FE55" => "u1fc00"
 *
 * @param code the unicode point used to generate the class name
 */
export const generateClassName = (code: string): string => {
  const dec = parseInt(code, 16)
  let hex = (Math.floor(dec / 1024) * 4).toString(16)
  if (hex.length < 2) {
    hex = "0" + hex
  }
  return "u" + hex + "00"
}
