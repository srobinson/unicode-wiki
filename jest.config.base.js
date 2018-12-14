module.exports = {
  roots: ["<rootDir>/src", "<rootDir>/test"],
  transform: {
    "^.+\\.ts$": "ts-jest",
  },
  testRegex: "(/test/.*.(test|spec)).(jsx?|tsx?)$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  coveragePathIgnorePatterns: ["(test/.*.mock).(jsx?|tsx?)$"],
}
