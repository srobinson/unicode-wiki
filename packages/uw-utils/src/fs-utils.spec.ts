import {InternalException} from "@uw/domain"
import {loadJSONFile} from "./fs-utils"

test("should happily read file and parse JSON", () => {
  const testFile = loadJSONFile(`${__dirname}/../package.json`)
  expect(testFile).toBeDefined()
})

test("should blow up when file not found", () => {
  try {
    loadJSONFile("BAD_PATH")
  } catch (e) {
    expect(e instanceof InternalException).toBeTruthy()
    expect(e.message).toBe("ENOENT: no such file or directory, open 'BAD_PATH'")
  }
})

test("should blow up when malformed json", () => {
  try {
    loadJSONFile(`${__dirname}/../fixtures/bad-json`)
  } catch (e) {
    expect(e instanceof InternalException).toBeTruthy()
    expect(e.message).toBe("Unexpected token a in JSON at position 4")
  }
})
