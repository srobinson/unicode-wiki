import client from "@uw/api/src/db/elastic/client"
import * as queries from "@uw/api/src/db/elastic/queries/codepoint"
// @ts-ignore
import * as fixtures from "./fixtures.json"

const _getById = (_resolve: {}) => new Promise(resolve => resolve(_resolve))

describe("Db::Elastic::Codepoints::getById", async () => {
  it("returns", async () => {
    client.search = jest.fn(_getById.bind(undefined, fixtures._single_hit))
    const result = await queries.getById(1)
    expect(client.search).toHaveBeenCalledTimes(1)
    expect(result).toEqual({index: 1})
  })
  it("throws when more than 1 record matched", async () => {
    client.search = jest.fn(_getById.bind(undefined, fixtures._duplicate_hits))
    try {
      await queries.getById(1)
    } catch (e) {
      expect(e.message).toMatch("getById::1 returned 2 hits. Expected only 1 hit")
    }
    expect(client.search).toHaveBeenCalledTimes(1)
  })
})
