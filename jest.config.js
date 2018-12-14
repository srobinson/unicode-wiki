module.exports = {
  mapCoverage: true,
  moduleFileExtensions: ["ts", "tsx", "js"],
  moduleNameMapper: {
    "@test/(.*)": "<rootDir>/packages/$1/src/index$1.ts",
  },
  transform: {
    "^.+\\.(ts|tsx)$": "<rootDir>/node_modules/ts-jest/preprocessor.js",
  },
  testMatch: ["**/*-spec.(ts|tsx)"],
}

// module.exports = {
//   bail: true,
//   modulePathIgnorePatterns: ["build", "dist"],
//   preset: "ts-jest",
//   roots: ["<rootDir>/src"],
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
//   testEnvironment: "node",
// }

// module.exports = {
//   transform: {
//     "^.+\\.tsx?$": "ts-jest",
//   },
//   testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(tsx?)$",
//   testPathIgnorePatterns: ["/dist/", "/build/dist/", "/node_modules/"],
//   moduleFileExtensions: ["ts", "tsx", "json", "node"],
//   collectCoverage: true,
// }
