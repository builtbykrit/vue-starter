module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  safelist: [{ pattern: /col-start-(\d)/ }],
  theme: {
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}
