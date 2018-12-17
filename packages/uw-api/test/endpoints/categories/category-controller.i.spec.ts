import {GetResourceResponse, ResourceNotFoundTest} from "../../_helpers/supertest"
// @ts-ignore
import * as fixtures from "./fixtures.json"

runGetCategoryById("block")
runGetCategoryById("script")
runGetCategoryById("symbol")

function runGetCategoryById(type: string) {
  describe(`Category-controller::getCategoryById::/${type}`, () => {
    it(`returns resource`, async () => {
      const response = await GetResourceResponse(`/api/${type}/1`)
      const body = response.body
      expect(response.status).toBe(200)
      expect(body).toMatchObject(fixtures[type])
    })

    it("returns 404", async () => {
      ResourceNotFoundTest(`/api/${type}/-1`)
      ResourceNotFoundTest(`/api/${type}/abc`)
    })
  })
}
