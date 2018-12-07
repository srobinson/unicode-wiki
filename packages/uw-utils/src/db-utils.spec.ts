import {codepointIndexRangeQuery, codepointIndexRangeOrQuery} from "./db-utils"

describe("codepointIndexRangeQuery utility", () => {
  it("Should generate a valid query", () => {
    expect(codepointIndexRangeQuery("0000")).toEqual({
      index: {
        $gte: 0,
      },
    })
    expect(codepointIndexRangeQuery("0000:0005")).toEqual({
      index: {
        $gte: 0,
        $lte: 5,
      },
    })
    // this signature is supported however
    // the query will yield zero results
    expect(codepointIndexRangeQuery("0005:0000")).toEqual({
      index: {
        $gte: 5,
        $lte: 0,
      },
    })
  })

  it("Should blow up if invalid query", () => {
    expect(() => codepointIndexRangeQuery("XXXXX")).toThrowError("XXXXX not a valid range")
    expect(() => codepointIndexRangeQuery("XXXXX:YYYY")).toThrowError(
      "XXXXX:YYYY not a valid range",
    )
    expect(() => codepointIndexRangeQuery("0000:XXXX")).toThrowError("0000:XXXX not a valid range")
  })
})

describe("codepointIndexRangeOrQuery utility", () => {
  it("Should generate a valid query", () => {
    expect(codepointIndexRangeOrQuery(["0000:0005", "000A:000B"])).toEqual({
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
    expect(codepointIndexRangeOrQuery(["0000:0005", "000A"])).toEqual({
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
    expect(() => codepointIndexRangeOrQuery(["0000:0005", "XXXX:YYYY"])).toThrowError(
      "XXXX not a valid range",
    )
  })
})
