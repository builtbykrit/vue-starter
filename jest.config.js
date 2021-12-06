module.exports = {
  transform: {
    "^.+\\.[t|j]sx?$": "babel-jest",
    "^[^.]+.vue$": "@vue/vue3-jest",
  },
  testMatch: ["**/tests/**/*.spec.js"],
  moduleFileExtensions: ["js", "vue"],
  moduleNameMapper: {
    ".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)(\\?component)?$":
      "jest-transform-stub",
    "@/(.*)": "<rootDir>/src/$1",
  },
  testEnvironment: "jsdom",
  collectCoverage: true,
}
