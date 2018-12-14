import {splitCamelCase, objectToString} from "../src"

describe("splitCamelCase utility", () => {
  it("Separates input with the default token", () => {
    expect(splitCamelCase("helloWorldBar")).toBe("Hello World Bar")
  })

  it("Separates input with token argument", () => {
    expect(splitCamelCase("helloWorldBar", "-")).toBe("Hello-World-Bar")
  })
})

describe("objectToString utility", () => {
  const source = {
    100: 200,
    foo: "bar",
  }
  it("Transforms object using default arguments", () => {
    const expected = "100=200&foo=bar"
    expect(objectToString(source)).toBe(expected)
  })

  it("Transforms object using custom arguments", () => {
    const expected = "100+200;foo+bar"
    expect(objectToString(source, ";", "+")).toBe(expected)
  })
})
