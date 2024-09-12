import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

import testPlugin from "vite-plugin-cdn/test"

export default defineConfig((params) => {
  const { command, mode } = params
  return {
    plugins: [vue(), testPlugin()],
    define: {},
    server: {
      port: 3154,
      open: false,
      cors: true,
      proxy: {}
    },
    build: {
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
      assetsDir: 'static/assets',
      rollupOptions: {
        external: ["vue"],
        output: {
          chunkFileNames: `static/js/[name]-[hash].js`,
          entryFileNames: `static/js/[name]-[hash].js`,
          assetFileNames: `static/[ext]/[name]-[hash].[ext]`
        }
      }
    },
    resolve: { }
    //assetsDirs
  } as any
})
