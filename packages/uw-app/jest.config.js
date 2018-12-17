const base = require("../../jest.config.base.js")

module.exports = {
  ...base,
  displayName: "@uw/app",
  name: "@uw/app",
  setupTestFrameworkScriptFile: "./../../test-setup.ts",
}
