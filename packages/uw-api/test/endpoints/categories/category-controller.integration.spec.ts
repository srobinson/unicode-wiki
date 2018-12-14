import {agent, SuperTest, Test, Response} from "supertest"
import App from "../../../src/index"

describe("category-controller::getCategoryById::/block", () => {
  runGetCategoryById("block")
})

describe("category-controller::getCategoryById::/script", () => {
  runGetCategoryById("script")
})

describe("category-controller::getCategoryById::/script", () => {
  runGetCategoryById("symbol")
})

function runGetCategoryById(type: string) {
  describe(`category-controller::getCategoryById::/${type}`, () => {
    it(`returns resource`, async () => {
      const response = await GetResourceResponse(`/api/${type}/1`)
      const body = response.body
      expect(response.status).toBe(200)
      expect(body).toMatchObject(resourceDefinitions[type])
    })

    it("returns 404", async () => {
      ResourceNotFoundTest(`/api/${type}/-1`)
      ResourceNotFoundTest(`/api/${type}/abc`)
    })
  })
}

async function GetResourceResponse(url: string): Promise<Response> {
  const request: SuperTest<Test> = agent(App)
  const response = await request.get(url)
  return response
}

async function ResourceNotFoundTest(url: string) {
  const response = await GetResourceResponse(url)
  const errObject = {
    err: {
      message: `Resource ${url} was not found.`,
      name: "Error",
      stack: `Error: Resource ${url} was not found.`,
    },
    statusCode: 404,
  }
  const body = response.body
  expect(response.status).toBe(404)
  expect(body).toEqual(errObject)
}

const resourceDefinitions = {
  block: {
    index: 1,
    key: "basic-latin",
    parent: 0,
    range: [{from: "0000", to: "007F"}],
    title: "Basic Latin",
  },
  script: {
    childRanges: [
      {from: "0530", to: "058F"},
      {from: "FB13", to: "FB17"},
      {from: "102A0", to: "102DF"},
      {from: "10530", to: "1056F"},
      {from: "10800", to: "1083F"},
      {from: "0400", to: "04FF"},
      {from: "0500", to: "052F"},
      {from: "2DE0", to: "2DFF"},
      {from: "A640", to: "A69F"},
      {from: "1C80", to: "1C8F"},
      {from: "10500", to: "1052F"},
      {from: "10A0", to: "10FF"},
      {from: "1C90", to: "1CBF"},
      {from: "2D00", to: "2D2F"},
      {from: "2C00", to: "2C5F"},
      {from: "1E000", to: "1E02F"},
      {from: "10330", to: "1034F"},
      {from: "0370", to: "03FF"},
      {from: "1F00", to: "1FFF"},
      {from: "10140", to: "1018F"},
      {from: "0000", to: "007F"},
      {from: "0000", to: "007F"},
      {from: "0080", to: "00FF"},
      {from: "0100", to: "017F"},
      {from: "0180", to: "024F"},
      {from: "2C60", to: "2C7F"},
      {from: "A720", to: "A7FF"},
      {from: "AB30", to: "AB6F"},
      {from: "1E00", to: "1EFF"},
      {from: "FB00", to: "FB06"},
      {from: "FF00", to: "FF5E"},
      {from: "0250", to: "02AF"},
      {from: "1D00", to: "1D7F"},
      {from: "1D80", to: "1DBF"},
      {from: "10600", to: "1077F"},
      {from: "10000", to: "1007F"},
      {from: "10080", to: "100FF"},
      {from: "10100", to: "1013F"},
      {from: "10280", to: "1029F"},
      {from: "10920", to: "1093F"},
      {from: "1680", to: "169F"},
      {from: "10C80", to: "10CFF"},
      {from: "10300", to: "1032F"},
      {from: "10350", to: "1037F"},
      {from: "101D0", to: "101FF"},
      {from: "16A0", to: "16FF"},
      {from: "10450", to: "1047F"},
    ],
    index: 1,
    key: "european-scripts",
    level: 0,
    parent: 0,
    range: [],
    title: "European Scripts",
  },
  symbol: {
    childRanges: [
      {from: "2800", to: "28FF"},
      {from: "1D100", to: "1D1FF"},
      {from: "1D200", to: "1D24F"},
      {from: "1D000", to: "1D0FF"},
      {from: "1BC00", to: "1BC9F"},
      {from: "1BCA0", to: "1BCAF"},
      {from: "1D800", to: "1DAAF"},
    ],
    index: 1,
    key: "notational-systems",
    level: 0,
    parent: 0,
    range: [],
    title: "Notational Systems",
  },
}
