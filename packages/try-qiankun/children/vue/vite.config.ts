import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from "node:path";

export default defineConfig((params) => {
  return {
    plugins: [vue()],
    define: {},
    server: {
      port: 3155,
      open: false,
      cors: true,
      proxy: {}
    },
    build: {
      lib: {
        entry: resolve(__dirname, './src/index.ts'),
        name: 'vue-component',
        formats: ['es', "cjs"],
      },
      sourcemap: true,
      chunkSizeWarningLimit: 2000,
      assetsDir: 'static/assets',
      rollupOptions: {
        output: {
          chunkFileNames: `static/js/[name]-[hash].js`,
          entryFileNames: `static/js/[name]-[hash].js`,
          assetFileNames: `static/[ext]/[name]-[hash].[ext]`
        }
      }
    },
    resolve: {}
    //assetsDirs
  } as any
})
