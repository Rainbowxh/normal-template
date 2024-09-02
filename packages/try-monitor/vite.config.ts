import { defineConfig } from "vite"
import { resolve } from "node:path"
import pkg from "./package.json"
import vue from "@vitejs/plugin-vue"

export default function() {
  return defineConfig({
    plugins: [vue()],
    build: {
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'vue-component',
        formats: ['es', "cjs"],
      },
      terserOptions: {
        compress: {
          drop_console: true,
        }
      },
      outDir: 'dist',
      rollupOptions: {
        external: ['vue'],
        output: {
          exports: 'named',
          entryFileNames: `${pkg.name}.[format].js`,
          chunkFileNames: '[name].[format].js'
        }
      }
    }
  })
}
