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
      animation: {
        indeterminate: "slideRight 2s ease-in-out infinite",
      },
      keyframes: {
        slideRight: {
          "0%": { left: "-60%" },
          "100%": { left: "100%" },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
}
