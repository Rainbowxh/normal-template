import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig((params) => {
  const { command, mode } = params
  return {
    plugins: [vue()],
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
    resolve: {
      alias: {
        vue: './src/main.ts'
      }
    }
    //assetsDirs
  } as any
})
