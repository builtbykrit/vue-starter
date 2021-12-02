module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^[^.]+.vue$": "@vue/vue3-jest",
  },
  testMatch: ["**/tests/**/*.spec.js"],
  moduleFileExtensions: ["js", "vue"],
  testEnvironment: "jsdom",
  collectCoverage: true,
  collectCoverageFrom: [
    "src/components/**/*.{js,vue}",
    "!node_modules/**",
    "!src/components/**/index.js",
  ],
}
