module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^[^.]+.vue$": "@vue/vue3-jest",
  },
  testMatch: ["**/tests/**/*.spec.js"],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
}
