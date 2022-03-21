const colors = require("tailwindcss/colors")

module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js}"],
  safelist: [{ pattern: /col-start-(\d)/ }],
  theme: {
    extend: {
      colors: {
        primary: colors.blue,
        secondary: colors.green,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
