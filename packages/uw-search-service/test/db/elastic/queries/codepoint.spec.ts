import {client} from "@uw/search-service/src/db/elastic/client"
import * as queries from "@uw/search-service/src/db/elastic/queries/codepoint"

const _suggest = (_resolve: {}) => new Promise(resolve => resolve(_resolve))

describe("Db::Elastic::Codepoints::suggest", async () => {
  it("returns matches in correct order", async () => {
    client.search = jest.fn(
      _suggest.bind(undefined, {
        suggest: {
          suggest: [
            {
              options: [
                {
                  text: "boxing",
                },
                {
                  text: "box",
                },
              ],
            },
          ],
        },
      }),
    )
    const result = await queries.suggest("box")
    expect(client.search).toHaveBeenCalledTimes(1)
    expect(result).toEqual(["box", "boxing"])
  })
  it("returns empty array", async () => {
    client.search = jest.fn(
      _suggest.bind(undefined, {
        suggest: {
          suggest: [
            {
              options: [],
            },
          ],
        },
      }),
    )
    const result = await queries.suggest("xyz")
    expect(client.search).toHaveBeenCalledTimes(1)
    expect(result).toEqual([])
  })
})
