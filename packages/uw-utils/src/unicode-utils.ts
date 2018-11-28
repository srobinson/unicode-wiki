import {CodepointIndexRange} from "@uw/domain"

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
 * Trasnforms a colon delimited string of hex pairs
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
 * @param input the string to transform
 * @return the transformed input @see CodepointIndexRange
 */
export const hexRange = (input: string): CodepointIndexRange => {
  // occasionally the string will be delimited by ".."
  input = input.replace("..", ":")
  const parts = input.split(":")
  if (!isHex(parts[0])) {
    throw new Error(`${input} not a valid range`)
  }
  const from = parseInt(parts[0], 16)
  if (parts.length === 2 && parts[1].length) {
    if (!isHex(parts[1])) {
      throw new Error(`${input} not a valid range`)
    }
    const to = parseInt(parts[1], 16)
    return {from, to}
  }
  return {from, to: from}
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
