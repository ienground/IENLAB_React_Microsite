import path from "path"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import svgr from "vite-plugin-svgr"
import babel from "@rolldown/plugin-babel"
import type { PluginItem } from "@babel/core"
import pkg from "./package.json"

// Babel + Rolldown에서 사용할 데코레이터 preset
function decoratorPreset(options: Record<string, unknown>) {
  return {
    preset(api: unknown, _opts: unknown, _dirname: string) {
      const plugins: PluginItem<object>[] = [
        ["@babel/plugin-proposal-decorators", options],
      ]

      return {
        plugins,
      }
    },
    rolldown: {
      filter: {
        code: "@",
      },
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    svgr(),
    // Babel + Rolldown preset 적용
    babel({
      presets: [decoratorPreset({ version: "2023-11" })],
    }),
  ],
  define: {
    "import.meta.env.VITE_APP_BUILD_DATE": JSON.stringify(Date.now()),
    "import.meta.env.VITE_APP_NAME": JSON.stringify(pkg.name),
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(pkg.version),
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})