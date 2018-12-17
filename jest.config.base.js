module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["(test/.*.mock).(jsx?|tsx?)$"],
  roots: ["<rootDir>/src", "<rootDir>/test"],
  testPathIgnorePatterns: ["/node_modules/", "/_helpers/"],
  modulePaths: ["<rootDir>"],
}
