import {agent, SuperTest, Test, Response} from "supertest"
import App from "@uw/api/src/index"

export async function GetResourceResponse(url: string): Promise<Response> {
  const request: SuperTest<Test> = agent(App)
  const response = await request.get(url)
  return response
}

export async function ResourceNotFoundTest(url: string) {
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
