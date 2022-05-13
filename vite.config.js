import { defineConfig, loadEnv } from "vite"
import svgLoader from "vite-svg-loader"
import vue from "@vitejs/plugin-vue"
import Components from "unplugin-vue-components/vite"
import path from "path"

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())

  // expose .env as process.env instead of import.meta since jest does not import meta yet
  const envWithProcessPrefix = Object.entries(env).reduce(
    (prev, [key, val]) => {
      return {
        ...prev,
        ["process.env." + key]: `"${val}"`,
      }
    },
    {}
  )

  return {
    define: envWithProcessPrefix,
    plugins: [vue(), Components(), svgLoader()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "/src"),
      },
    },
  }
})
