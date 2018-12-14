import {isHex, codepointHexRange, codepointIndexRange, fromCharCode} from "../src"

describe("isHex utility", () => {
  it("Returns true for valid hex input", () => {
    expect(isHex("0000")).toBeTruthy()
    expect(isHex("A000")).toBeTruthy()
    expect(isHex("A0001")).toBeTruthy()
    expect(isHex("FFF01")).toBeTruthy()
  })

  it("Returns false for invalid hex input", () => {
    expect(isHex("GGGG")).toBeFalsy()
    expect(isHex("ZZZZ")).toBeFalsy()
    expect(isHex("XCVXDS")).toBeFalsy()
    expect(isHex("FFFFFFFF")).toBeFalsy()
  })
})

describe("codepointIndexRange utility", () => {
  it("Returns valid hex range", () => {
    expect(codepointIndexRange("0000")).toEqual({
      from: 0,
      to: 0,
    })
    expect(codepointIndexRange("0000:0000")).toEqual({
      from: 0,
      to: 0,
    })
    expect(codepointIndexRange("0000:0005")).toEqual({
      from: 0,
      to: 5,
    })
  })

  it("Throws error for invalid hex range", () => {
    expect(() => codepointHexRange("ZZZZ")).toThrowError("ZZZZ not a valid range")
    expect(() => codepointHexRange("0000:ZZZZ")).toThrowError("ZZZZ not a valid range")
    expect(() => codepointHexRange("ZZZZ:0000")).toThrowError("ZZZZ not a valid range")
  })
})

describe("fromCharCode utility", () => {
  it("should generate UTF-16 string", () => {
    expect(fromCharCode("00AB")).toEqual("«")
    expect(fromCharCode("00D8")).toEqual("Ø")
    expect(fromCharCode("F65001").length).toEqual(2)
  })

  it("should blow up for invalid input", () => {
    expect(() => fromCharCode("XXXXXX")).toThrowError("XXXXXX is not a valid hex character")
  })
})
