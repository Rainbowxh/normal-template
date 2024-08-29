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
    rollupOptions: {},
    resolve: {}
    //assetsDirs
  } as any
})
