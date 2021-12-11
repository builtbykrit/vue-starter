module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^[^.]+.vue$": "@vue/vue3-jest",
  },
  testMatch: ["**/tests/**/*.spec.js"],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    ".+\\.(svg)(\\?component)?$": "<rootDir>/tests/svgMock.vue",
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
}
