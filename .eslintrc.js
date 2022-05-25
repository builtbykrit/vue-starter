module.exports = {
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-recommended",
    "plugin:prettier-vue/recommended",
    "prettier",
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "prettier-vue/prettier": [
      "error",
      {
        // Override all options of `prettier` here
        // @see https://prettier.io/docs/en/options.html
        semi: false,
      },
    ],
    "vue/valid-v-slot": ["error", { allowModifiers: true }],
  },
}
