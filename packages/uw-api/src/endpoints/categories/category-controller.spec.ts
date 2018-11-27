import {agent, SuperTest, Test} from "supertest"
import * as mongoose from "mongoose"
import * as http from "http"
import app from "../../app"
import "../../config"

let server: http.Server
beforeAll(done => {
  server = app.listen(process.env.NODE_PORT, done)
  mongoose.connection.on("open", done)
})

describe(__filename, () => {
  it("getCategoryById returns resource", async () => {
    const request: SuperTest<Test> = agent(server)

    const categoryResource = {
      _id: "5bd1e85d44964ea1f05fd5e2",
      index: 1,
      key: "basic-latin",
      parent: 0,
      range: {from: "0000", to: "007F"},
      title: "Basic Latin",
    }

    const response = await request.get(`/api/block/1`)
    const body = response.body

    expect(response.status).toBe(200)
    expect(body).toEqual(categoryResource)
  })
})
