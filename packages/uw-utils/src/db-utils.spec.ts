import {hexRangeQuery, hexRangeOrQuery} from "./db-utils"

describe("hexRangeQuery utility", () => {
  it("Should generate a valid query", () => {
    expect(hexRangeQuery("0000")).toEqual({
      index: {
        $gte: 0,
      },
    })
    expect(hexRangeQuery("0000:0005")).toEqual({
      index: {
        $gte: 0,
        $lte: 5,
      },
    })
    // this signature is supported however
    // the query will yield zero results
    expect(hexRangeQuery("0005:0000")).toEqual({
      index: {
        $gte: 5,
        $lte: 0,
      },
    })
  })

  it("Should blow up if invalid query", () => {
    expect(() => hexRangeQuery("XXXXX")).toThrowError("XXXXX not a valid range")
    expect(() => hexRangeQuery("XXXXX:YYYY")).toThrowError("XXXXX:YYYY not a valid range")
    expect(() => hexRangeQuery("0000:XXXX")).toThrowError("0000:XXXX not a valid range")
  })
})

describe("hexRangeOrQuery utility", () => {
  it("Should generate a valid query", () => {
    expect(hexRangeOrQuery(["0000:0005", "000A:000B"])).toEqual({
      $or: [
        {
          index: {
            $gte: 0,
            $lte: 5,
          },
        },
        {
          index: {
            $gte: 10,
            $lte: 11,
          },
        },
      ],
    })
    expect(hexRangeOrQuery(["0000:0005", "000A"])).toEqual({
      $or: [
        {
          index: {
            $gte: 0,
            $lte: 5,
          },
        },
        {
          index: {
            $gte: 10,
          },
        },
      ],
    })
  })

  it("should blow up for an invalid range", () => {
    expect(() => hexRangeOrQuery(["0000:0005", "XXXX:YYYY"])).toThrowError(
      "XXXX:YYYY not a valid range",
    )
  })
})
