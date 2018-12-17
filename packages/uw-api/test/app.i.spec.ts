import * as request from "supertest"
import app from "@uw/api/src/app"

describe("GET /api", () => {
  it("should return 200 OK", async () => {
    const response = await request(app).get("/api")
    expect(response.status).toBe(200)
    expect(response.body).toEqual({status: "OK"})
  })
})

describe("GET /404", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/random-url")
    expect(response.status).toBe(404)
    expect(response.text).toMatch(/Cannot GET \/random-url/)
  })
})

describe("GET /api/404", () => {
  it("should return 404", async () => {
    const response = await request(app).get("/api/random-url")
    expect(response.status).toBe(404)
    expect(response.body).toEqual({
      err: {
        message: "Resource /api/random-url was not found.",
        name: "Error",
        stack: "Error: Resource /api/random-url was not found.",
      },
      statusCode: 404,
    })
  })
})
